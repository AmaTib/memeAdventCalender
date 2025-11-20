import React, { useEffect, useState } from "react";
import { CalenderView } from "./components/CalenderView";
import "./App.css";

function App() {
  const [nameExists, setNameExists] = useState(false);
  const [nameInput, setNameInput] = useState(
    localStorage.getItem("memeCalenderUserName") || ""
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedName = localStorage.getItem("memeCalenderUserName");

    if (storedName) {
      setNameExists(true);
    }

    setLoading(false);
  }, []);

  function addName() {
    const cleanedNameInput = nameInput.trim();

    if (cleanedNameInput.length === 0) {
      alert("Skriv ditt namn");
      return;
    }

    if (cleanedNameInput.length < 2) {
      alert("Namnet måste vara längre än en bokstav");
      return;
    }

    if (cleanedNameInput.length > 15) {
      alert("Namnet får innehålla max 15 bokstäver");
      return;
    }

    localStorage.setItem("memeCalenderUserName", cleanedNameInput);
    console.log(cleanedNameInput);
    setNameExists(true);
  }

  console.log(nameInput, nameExists);

  if (loading) return <p>loading...</p>;

  return (
    <>
      {!nameExists ? (
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
          <button onClick={addName}>Bekräfta</button>
        </article>
      ) : (
        <>
          <CalenderView nameExists={nameExists} nameInput={nameInput} />
          <button
            onClick={() => {
              setNameExists(false);
            }}
          >
            Redigera ditt namn
          </button>
        </>
      )}
    </>
  );
}

export default App;
