import { useState } from "react";
import "./App.css";

function App() {
  const [nameExists, setNameExist] = useState(false); //fixa så att den kollar localstorage om det finns ett namn angivet redan

  /*  
 
  kalendern består av en array med 24 objekt  (en för varje dag till den 24:e dec)
  varje object är alltså en dag

class day{
  name: number elr string (t. ex 1, 2, 3 osv)
  hasBeenOpened: boolean (alla är false från början)
  dateOfThisDay: date (borde vara date datatyp, vet dock inte för tillfället hur jag kan sätta ett specifikt datum för varje objekt)
}  


 */

  return (
    <>
      {!nameExists && (
        <article>
          <h1>Välkommen till din meme adventskalender!</h1>
          <h2>Fyll i ditt namn</h2>

          <input type="text" placeholder="Jane Doe" />
          <button>Bekräfta</button>
        </article>
      )}

      {nameExists && (
        <article>
          <h1>"Ifyllt namns" adventskalender</h1>
        </article>
      )}
    </>
  );
}

export default App;
