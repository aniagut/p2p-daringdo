import {ChangeEvent, useContext, useRef, useState} from "react";
import { ChatContext } from "../../context/ChatContext";
import { RoomContext } from "../../context/RoomContext";
import { UserContext } from "../../context/UserContext";
import { Button } from "../common/Button";
import { FaCreativeCommonsShare } from "react-icons/fa";
import { IoMdSend } from "react-icons/io";
import { MdDelete } from "react-icons/md";

export const ChatInput: React.FC = () => {
  const [file, setFile] = useState<File>();
  const fileInputRef: any = useRef();
  const [message, setMessage] = useState("");
  const { sendMessage } = useContext(ChatContext);
  const { userId } = useContext(UserContext);
  const { roomId } = useContext(RoomContext);
  const iconStyle = { color: "white", fontSize: "1.3em" }
  const smallButtonStyle = {color: "black", fontSize: "0.8em"}

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
  }

  const removeFile = () => {
      setFile(undefined);
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex ">
          <textarea
            className="border rounded"
            onChange={(e) => setMessage(e.target.value)}
            value={message}></textarea>
            <Button testId="file-upload-button"
                className="bg-blue-600 p-4 mx-2 rounded-lg text-xl hover:bg-blue-800 text-white"
                    onClick={()=>fileInputRef.current.click()}>
                <FaCreativeCommonsShare style={iconStyle}></FaCreativeCommonsShare>
            </Button>
            <input id="file-input" onChange={handleFileChange} multiple={false} ref={fileInputRef} type='file'hidden/>
          <Button
            testId="send-msg-button"
            type="submit"
            className="bg-blue-600 p-4 mx-2 rounded-lg text-xl hover:bg-blue-800 text-white"
          onClick={() => {
              sendMessage(message, roomId, userId, file);
              setMessage("");
              removeFile();
          }}>
              <IoMdSend style={iconStyle}></IoMdSend>
          </Button>
        </div>
          {file && <div>{file?.name}
              <Button className="bg-white hover:bg-white text-black-600 font-bold py-1 px-2 inline-flex items-center"
              onClick={removeFile}>
                  <MdDelete style={smallButtonStyle}></MdDelete>
              </Button></div>}
      </form>
    </div>
  );
};
