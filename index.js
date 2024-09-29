const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require('./models/chat.js');
const methodOverride = require('method-override');

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

main().then((res)=>{
    console.log("connected...")
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://bookstore:bookstore123@cluster0.cl9js.mongodb.net/chatapp');
};


app.get('/',(req,res)=>{
    res.send("<h1>Hello there...!! Go to '/chats' route to see the message...😎</h1>")
});

//chats route
app.get('/chats', async (req, res)=>{
    const chats = await Chat.find();
    res.render('index.ejs',{ chats })
});

//new chat route
app.get('/chats/new',(req, res)=>{
    res.render('newChat.ejs')
});

//new 
app.post('/chats',(req,res)=>{
    const { from, msg, to } = req.body;
    const newChat = new Chat({
        from,
        msg,
        to,
        creatat: new Date()
    })
    
    newChat.save().then((res)=>{
        console.log(res)
    }).catch((err)=>{
        console.log(err)
    })

    res.redirect('/chats');
});


//edit chats
app.get('/chats/:id/edit',async (req,res)=>{
    const { id } = req.params;
    const chat = await Chat.findById(id);
    res.render('edit.ejs', { chat });
});

//update route
app.put('/chats/:id',async (req,res)=>{
    const { id } = req.params;
    const { newMsg} = req.body;
    const updateChat = await Chat.findByIdAndUpdate(id, { msg : newMsg },{
        runValidators: true,
        new: true
    });
    res.redirect('/chats');
})

//delete chat route
app.delete('/chats/:id',async (req,res)=>{
    const { id } = req.params;
    const deleteChat = await Chat.findByIdAndDelete(id);
    res.redirect('/chats');
});

app.listen(8080, ()=>{
    console.log("Server is running...");
});

