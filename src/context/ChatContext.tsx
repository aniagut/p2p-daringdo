import { createContext, useEffect, useReducer } from "react";
import { IMessage } from "../types/chat";
import { chatReducer, ChatState } from "../reducers/chatReducer";
import {
    addHistoryAction,
    addMessageAction,
    toggleChatAction,
} from "../reducers/chatActions";
import { ws } from "../ws";
import Gun from 'gun'
import {wait} from "@testing-library/user-event/dist/utils";
interface ChatValue {
    chat: ChatState;
    sendMessage: (message: string, roomId: string, author: string, file: File | undefined) => void;
    toggleChat: () => void;
}

const gun = Gun({
    peers: ['http:16.171.239.168/gun']
})

const history = [] as IMessage[];
export const ChatContext = createContext<ChatValue>({
    chat: {
        messages: [],
        isChatOpen: false,
    },
    sendMessage: (message: string, roomId: string, author: string) => {},
    toggleChat: () => {},
});

export const ChatProvider: React.FC = ({ children }) => {
    const [chat, chatDispatch] = useReducer(chatReducer, {
        messages: [],
        isChatOpen: false,
    });

    const sendMessage = (message: string, roomId: string, author: string, file: File | undefined) => {
        let fileBase64 = '';

        getBase64(file, (result: any) => {
            fileBase64 = result;

            const messageData: IMessage = {
                content: message,
                timestamp: new Date().getTime(),
                author,
                file: fileBase64,
                filename: file?.name || ''
            };
            gun.get(roomId).get(messageData.timestamp.toString()).put({author: messageData.author, message: messageData.content, timestamp: messageData.timestamp, file: messageData.file, filename: messageData.filename});
            chatDispatch(addMessageAction(messageData));
        });
    };

    const getBase64 = (file: File | undefined, cb: any) => {
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file as File);
            reader.onload = function () {
                cb(reader.result)
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        }
        else {
            console.log('tu');
            cb('');
        }
    }

    const addHistory = (roomId: string) => {
        gun.get(roomId).on(_ => {
            gun.get(roomId).map(m => {
                const message = {content: m.message, author: m.author, timestamp: m.timestamp, file: m.file, filename: m.filename}
                if(!history.map(obj => obj.timestamp).includes(message.timestamp)) {
                    history.push(message);
                    chatDispatch(addHistoryAction(history));
                }
            });
        });
    };

    const toggleChat = () => {
        chatDispatch(toggleChatAction(!chat.isChatOpen));
    };
    useEffect(() => {
        ws.on("get-messages", addHistory);
        return () => {
            ws.off("get-messages", addHistory);
        };
    }, []);
    return (
        <ChatContext.Provider
            value={{
                chat,
                sendMessage,
                toggleChat,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};
