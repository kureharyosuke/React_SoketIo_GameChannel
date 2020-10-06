import React, { useState } from "react";
import Socket from "../Socket";

const Intro = (props) => {
  let [channel, setChannel] = useState("");
  let [name, setName] = useState("");

  const changeChannel = (ch) => {
    console.log(ch);
    setChannel(ch);
  };

  const enter = () => {
    if (!channel || !name) {
      alert("Channel or name is not entered.");
      return;
    }

    Socket.gameInit(channel, name);
    props.history.push(`/game?name=${name}`);
  };

  return (
    <>
      <h1> CHANNEL : {channel}</h1>
      <ul>
        <li onClick={() => changeChannel("ch.1")}>CH.1</li>
        <li onClick={() => changeChannel("ch.2")}>CH.2</li>
        <li onClick={() => changeChannel("ch.3")}>CH.3</li>
        <li onClick={() => changeChannel("ch.4")}>CH.4</li>
      </ul>

      <input
        type="text"
        placeholder="ID"
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={enter}>CONNECT</button>
    </>
  );
};

export default Intro;
