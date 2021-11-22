import "./Meme.css";

import { useState } from "react";

const aPhrases = [
  "forwards",
  "backwards",
  "up",
  "down",
  "life",
  "the future",
  "the past",
  "happiness",
  "sadness",
  "serenity",
];
const bPhrases = [
  "forwards",
  "backwards",
  "up",
  "down",
  "to make amends",
  "to heal your soul",
  "to fly like a bird",
  "to set yourself free",
  "to fulfill your dreams",
  "to let go",
];


export default function Meme() {
  const [msg, setMsg] = useState("");
  const [bg, setBg] = useState();
  const generate = () => {
    const phraseA = aPhrases[Math.floor(Math.random() * 10)];
    const phraseB = bPhrases[Math.floor(Math.random() * 10)];
    const newBg = Math.floor(Math.random() * 5 + 1);
    setMsg(`sometimes ${phraseA} is the only way ${phraseB}`);
    setBg(newBg);
  }

  
  return (
    <> 
    <button className="buttonMeme" onClick={generate}>GENERATE</button>
      <div className={`bgGlobal bgChooser${bg}`}>
        <span className="spHighlight">
          <h2>
            <mark>{msg}</mark>
          </h2>
        </span>
      </div>
     
    </>
  );
}
