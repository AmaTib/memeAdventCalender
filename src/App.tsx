import React, { useState } from "react";
import { CalenderView } from "./components/CalenderView";
import "./App.css";

function App() {
  const [nameExists, setNameExists] = useState(
    localStorage.getItem("memeCalenderUserName") !== null
  );
  const [nameInput, setNameInput] = useState(
    localStorage.getItem("memeCalenderUserName") || ""
  );

  console.log(nameInput, nameExists);

  return (
    <>
      {!nameExists && (
        <article>
          <h1>Välkommen till din meme adventskalender!</h1>
          <h2>Fyll i ditt namn</h2>

          <input
            type="text"
            placeholder="Jane Doe"
            value={nameInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNameInput(e.target.value);
            }}
          />
          <button
            onClick={() => {
              if (nameInput != "") {
                localStorage.setItem("memeCalenderUserName", nameInput);
                console.log(nameInput);
                setNameExists(true);
              }
            }}
          >
            Bekräfta
          </button>
        </article>
      )}

      <CalenderView nameExists={nameExists} nameInput={nameInput} />
    </>
  );
}

export default App;
