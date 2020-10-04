const Channel = require("../../data/channel");
const Chat = require("../../data/chat");
const Score = require("../../data/score");

const score1 = new Score();
const chat1 = new Chat();
const channel1 = new Channel(score1, chat1);

channel1.addMsg({ name: "user1", chat: "msg1" });
channel1.addMsg({ name: "user2", chat: "msg2" });
channel1.addMsg({ name: "user3", chat: "msg3" });
channel1.addMsg({ name: "user4", chat: "msg4" });

channel1.addScore({ name: "user1", score: 10 });
channel1.addScore({ name: "user2", score: 9 });
channel1.addScore({ name: "user3", score: 8 });
channel1.addScore({ name: "user4", score: 7 });

console.log(channel1.getChats());
console.log(channel1.getScores());
