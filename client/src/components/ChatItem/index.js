import "./index.css";

const ChatItem = ({ imageLink, text }) => {
  return (
    <div className="chatitem">
      <img className="chatitem-profile" src={imageLink} alt="profile-img" />
      <pre>{text}</pre>
    </div>
  );
};

export default ChatItem;
