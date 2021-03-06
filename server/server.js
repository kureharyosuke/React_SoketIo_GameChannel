const app = require("express")();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

const Channel = require("./data/channel");
const Chat = require("./data/chat");
const Score = require("./data/score");

const PORT = 5000;

const CHANNEL_USER = {}; // 유저가 어느 채널에 접속됐는지에 대한 정보
const CHANNEL_DATA = {}; // 채널별로 가지고 있는 채널객체

// 채널은 ch.숫자 형태로 관리한다.
// 1~4번까지 4개의 채널을 만들어줍니다.
for (let i = 1; i < 5; ++i) {
  const score = new Score();
  const chat = new Chat();
  const channel = new Channel(score, chat);
  CHANNEL_DATA[`ch.${i}`] = channel;
}

app.get("/", (req, res) => {
  res.send("Hello World");
});

server.listen(PORT, () => {
  console.log(`server on: http://localhost:${PORT}`);
});

io.on("connection", function (socket) {
  //
  //
  // 채널생성 : Channel ON
  socket.on("/channel", (data) => {
    let { name, channel } = data;
    console.log(CHANNEL_DATA);
    if (!CHANNEL_USER[name]) {
      CHANNEL_USER[name] = channel;

      socket.join(channel); // ROOM JOIN

      socket.emit("/channel/complete", {
        status: 200,
        chats: CHANNEL_DATA[channel].getChats(),
        scores: CHANNEL_DATA[channel].getScores(),
      });
    } else {
      socket.emit("/channel/fail", {
        status: 200,
        msg: "이미 등록된 유저입니다.",
      });
    }
  });
  //
  //
  // 랭킹등록
  socket.on("/rank", (data) => {
    let { name } = data;
    let channel = CHANNEL_USER[name];
    console.log(data, name, channel);

    if (!channel) {
      socket.emit("/fail", { status: 200, msg: "잘못된 유저입니다." });
      return;
    }
    CHANNEL_DATA[channel].addScore(data);
    console.log(CHANNEL_DATA[channel].getScores());

    io.to(channel).emit("/rank/complete", {
      status: 200,
      scores: CHANNEL_DATA[channel].getScores(),
    });

    // socket.emit("/rank/complete", {
    //   status: 200,
    //   scores: CHANNEL_DATA[channel].getScores(),
    // });
  });
  //
  //
  // 채팅생성
  socket.on("/chat", (data) => {
    let { name } = data;
    let channel = CHANNEL_USER[name];
    CHANNEL_DATA[channel].addMsg(data);

    if (!channel) {
      socket.emit("/fail", { status: 200, msg: "잘못된 유저입니다." });
      return;
    }

    // 해당 룸에만 이벤트 발생
    io.to(channel).emit("/chat/complete", {
      status: 200,
      chats: CHANNEL_DATA[channel].getChats(),
    });

    // socket.emit("/chat/complete", {
    //   status: 200,
    //   chats: CHANNEL_DATA[channel].getChats(),
    // });
  });
});
