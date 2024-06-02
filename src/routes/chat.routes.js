import { Router } from "express";
import model from '../dao/models/chat.model.js'

const router = Router();

router.get('/', async (req,res)=>{
    const arrayMessages = await model.find().lean();
    console.log(arrayMessages);
    res.render('chat', {data: arrayMessages, exists: true})
})

router.post('/', async (req, res)=> {
    const socketServer = req.app.get('socketServer');
    const newMessage = {user: req.body.user, message: req.body.message}
    await model.create(newMessage)
    socketServer.emit('newMessageConfirmation', newMessage)
})

export default router