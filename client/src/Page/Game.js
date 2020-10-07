import React, { useState } from "react";
import { useSelector } from "react-redux";
import Socket from "../Socket";

function getUrlParams() {
  var params = {};
  window.location.search.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    str,
    key,
    value
  ) {
    params[key] = value;
  });
  return params;
}

const Game = (props) => {
  let [level, setLevel] = useState(0);
  let [chat, setChat] = useState("");

  let { chats = [], scores = [] } = useSelector((s) => ({
    chats: s.Chat.chats,
    scores: s.Score.scores,
  }));

  const rank = () => {
    let { name } = getUrlParams(props.location);
    Socket.emitScore(name, level);
  };

  const send = () => {
    let { name } = getUrlParams(props.location);
    Socket.emitChat(name, chat);
  };

  return (
    <>
      <div id="game-board">
        <div>
          <h2>{level}</h2>
          <button onClick={() => setLevel(level + 1)}>+</button>
          <button onClick={() => setLevel(level - 1)}>-</button>
        </div>
        <div>
          <button onClick={rank}>Register</button>
        </div>
      </div>

      <div id="rank">
        <h2>RANK</h2>
        <ul>
          {scores.map((item, idx) => (
            <li key={idx}>
              <span>RANK : {idx + 1}</span>
              <span>NAME : {item.name}</span>
              <span>SCORE : {item.score}</span>
            </li>
          ))}
        </ul>
      </div>

      <div id="chat">
        <h2>CHAT</h2>
        <input type="text" onChange={(e) => setChat(e.target.value)} />
        <button onClick={send}>SEND</button>
        <ul>
          {chats.map((item, idx) => (
            <li key={idx}>
              <span>NAME : {item.name}</span>
              <span>CHAT : {item.chat}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Game;
