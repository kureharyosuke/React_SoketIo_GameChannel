const Chat = require("../../data/chat");

const chat1 = new Chat();

chat1.add({ name: "user1", chat: "msg1" });
chat1.add({ name: "user2", chat: "msg2" });
chat1.add({ name: "user3", chat: "msg3" });
chat1.add({ name: "user4", chat: "msg4" });

console.log(chat1.msgs);
