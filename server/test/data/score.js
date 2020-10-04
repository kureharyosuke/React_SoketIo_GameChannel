const Score = require("../../data/score");

const score1 = new Score();

score1.add({ name: "user1", score: 10 });
score1.add({ name: "user2", score: 9 });
score1.add({ name: "user3", score: 8 });
score1.add({ name: "user4", score: 7 });

console.log(score1.scores);
