const Chat = require('./model');
require('dotenv').config();


const messages = [
  {
    "role": "user",
    "content": "something",
  },
  {
    "role": "assistant",
    "content": "that u get from prev response",
  },
  {
    "role": "user",
    "content": "what is llama3?",
  },
];

const main = async () => {
  const resp = await Chat(messages);
  console.log(resp);
};

main();