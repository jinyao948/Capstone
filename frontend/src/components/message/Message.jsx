
   
import "./message.css";
import { format } from "timeago.js";

export default function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="data:image/jpeg;base64,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"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}