import { useRef } from "react";
import { SendIcon } from "../../icons";
import "./index.css";

const TextField = ({ setQuestion }) => {
  const inputRef = useRef();
  return (
    <div className="text-field">
      <input
        ref={inputRef}
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
      <SendIcon
        onClick={() => {
          setQuestion(inputRef.current.value);
          console.log(inputRef.current.value);
        }}
      />
    </div>
  );
};

export default TextField;
