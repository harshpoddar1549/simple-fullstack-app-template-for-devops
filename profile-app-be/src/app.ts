import express from 'express'
import cors from 'cors'
import { connectToDb } from './middleware/connectToDb'
import userModel from './models/user.model'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.use(express.json())

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS//'http://localhost:5173'
}))

connectToDb().then((res) => {
    console.log(`Connected to Db Successfully!!`)
    app.listen(process.env.PORT, ()=>console.log(`[INFO] Server Running on 8080`))
}).catch(err => console.log(err))

app.put('/', async (req, res) => {
    console.log(req.body)
    try{
        if(req.body.editMode){
            const r = await userModel.findOneAndUpdate({email: req.body.email}, req.body)
            console.log(r)
            if(!r){
                const r = await userModel.create(req.body)
                console.log(r) 
            }
        }else{
            const r = await userModel.create(req.body)
            console.log(r)
        }
        res.status(200).send('ok')
    }catch(err){
        console.log(err)
        res.status(400).send("Email already taken")
    }
})

app.post('/', async (req, res) => {
    if(req.body.email && req.body.email!==""){
        const user = await userModel.findOne({
            email: req.body.email
        })
        res.status(200).send(user)
    }else{
        res.status(400).send('Invalid body')
    }
})