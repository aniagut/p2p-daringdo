import { useContext } from "react";
import { RoomContext } from "../../context/RoomContext";
import { IMessage } from "../../types/chat";
import classNames from "classnames";
import { UserContext } from "../../context/UserContext";

export const ChatBubble: React.FC<{ message: IMessage }> = ({ message }) => {
  const { peers } = useContext(RoomContext);
  const { userId } = useContext(UserContext);
  const author = message.author && peers[message.author].userName;
  const userName = author || "Anonymous";
  const isSelf = message.author === userId;
  const time = new Date(message.timestamp).toLocaleTimeString();
  const fileDownloadStyle = { color: "blue" };
  const debugBase64 = (base64URL: string) => {
    var win = window.open();
    win?.document.write(
      '<iframe src="' +
        base64URL +
        '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>'
    );
  };
  return (
    <div
      className={classNames("m-2 flex", {
        "pl-10 justify-end": isSelf,
        "pr-10 justify-start": !isSelf,
      })}
    >
      <div className="flex flex-col">
        <div
          className={classNames("inline-block py-2 px-4 rounded", {
            "bg-blue-200": isSelf,
            "bg-blue-300": !isSelf,
          })}
        >
          {message.content}
          {message.file && (
            <button
              style={fileDownloadStyle}
              onClick={() => debugBase64(message.file)}
            >
              {message.filename}
            </button>
          )}
          <div
            className={classNames("text-xs opacity-50", {
              "text-right": isSelf,
              "text-left": !isSelf,
            })}
          >
            {time}
          </div>
        </div>
        <div
          className={classNames("text-md", {
            "text-right": isSelf,
            "text-left": !isSelf,
          })}
        >
          {isSelf ? "You" : userName}
        </div>
      </div>
    </div>
  );
};
