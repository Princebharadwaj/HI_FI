import { useEffect, useState } from "react";
import "../css/Chat.css";
import io from "socket.io-client";
import ScrollToBottom from "react-scroll-to-bottom";

const socket = io.connect("http://localhost:9001");

export default function Chat({clientName}) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const Name = clientName;
  const sendMessages = () => {
    if (message !== "") {
      const messageInfo = {
        user_id: socket.id,
        user_name: Name,
        msg: message,
        time: new Date().getHours() + ":" + new Date().getMinutes(),
        outgoing: true,
      };
      socket.emit("sending_messages", messageInfo);
      setMessage("");
      let newList = [...messageList, messageInfo];
      setMessageList(newList);
    }
  };

  useEffect(() => {
    socket.on("receiving_messages", (data) => {
      let newList = [...messageList, data];
      setMessageList(newList);
    });
  });
  return (
    
      <div className="chat-container">
        <div className="user-name">
          <img src="./images/princeimg.jpg" />
          <h4>{clientName}</h4>
        </div>
        <div id="append">
        <ScrollToBottom className="message-container">
          {messageList.map((ele, index) => {
            return (
                <div
                  className={
                    ele.outgoing === true
                      ? "message outgoing"
                      : "messsage incoming"
                  }
                  key={index}
                >
                  <h5>{ele.outgoing === true ? "You" : ele.user_name}</h5>
                  <p>{ele.msg}</p>
                  <i>{ele.time}</i>
                </div>
            );
        })}
        </ScrollToBottom>
        </div>
        <div className="chat-typing">
          <input
            type="text"
            placeholder="Enter your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                sendMessages();
              }
            }}
          />
          <span>
            {" "}
            <i
              className="fa-regular fa-paper-plane fa-2x"
              onClick={() => {
                sendMessages();
              }}
            ></i>{" "}
          </span>
        </div>
      </div>
    
  );
}
