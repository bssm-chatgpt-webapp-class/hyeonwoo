import { useRef } from "react";
import { SendIcon } from "../../icons";
import "./index.css";

const TextField = ({ sendChat }) => {
  const inputRef = useRef();
  return (
    <div className="text-field">
      <input ref={inputRef}></input>
      <SendIcon
        onClick={() => {
          sendChat(inputRef.current.value);
        }}
      />
    </div>
  );
};

export default TextField;
