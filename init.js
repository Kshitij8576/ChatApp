const mongoose = require('mongoose');
const Chat = require('./models/chat.js');

main().then((res)=>{
    console.log("connected...")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://bookstore:bookstore123@cluster0.cl9js.mongodb.net/chatapp');
}

let allchat = [
    {
        from: 'kshitij',
        to: 'abhay',
        msg: 'I am good buddy',
        creatat: new Date()
    },
    {
        from: 'abhay',
        to: 'dhano',
        msg: 'I am not so good buddy',
        creatat: new Date()
    },
    {
        from: 'suraj',
        to: 'anand',
        msg: 'I am not so bad kid',
        creatat: new Date()
    },
    {
        from: 'vijay',
        to: 'dhano',
        msg: 'i am a good person',
        creatat: new Date()
    },
    {
        from: 'pandit',
        to: 'ram',
        msg: 'i need money',
        creatat: new Date()
    }
];

Chat.insertMany(allchat)