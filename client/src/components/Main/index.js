import "./index.css";
import { profileImageLink, chatgptResponse } from "../../fixtures";
import ChatItem from "../ChatItem";

const Main = ({ question }) => {
  return (
    <div className="main">
      <ChatItem imageLink={profileImageLink} text={question} />
      <ChatItem imageLink="/images/chatgpt-logo.svg" text={chatgptResponse} />
    </div>
  );
};

export default Main;
