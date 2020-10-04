class Chat {
  constructor() {
    this.msgs = [];
  }

  add(msg) {
    // msg: {name, score}
    this.msgs.push(msg);
  }
}

module.exports = Chat;
