import io from "socket.io-client";

import { onScoreInit } from "../State/modules/score";
import { onChatInit } from "../State/modules/chat";
import { onChannelInit } from "../State/modules/channel";

const SOCKET = {
  IP: "127.0.0.1",
  PORT: "3000",
};

class Socket {
  constructor() {
    this.URL = `http://${SOCKET.IP}:${SOCKET.PORT}?data=KRW-BTC`;
    this.socket = io(this.URL);

    this.store = null;

    console.log("[SOCKET] CONNECTED: ", this.URL);
  }

  setStore(store) {
    this.store = store;
  }

  onGameInit(channel, name) {
    this.socket.on("");
  }

  onChat() {
    this.socket.on("");
  }

  onScore() {
    this.socket.on("");
  }
}

const s = new Socket();

export default s;
