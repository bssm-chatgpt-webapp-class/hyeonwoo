import "./reset.css";
import { Header, Main, TextField } from "./components";
import { useState } from "react";

function App() {
  const [question, setQuestion] = useState();
  return (
    <div className="App">
      <Header />
      <Main question={question} />
      <TextField setQuestion={setQuestion} />
    </div>
  );
}

export default App;
