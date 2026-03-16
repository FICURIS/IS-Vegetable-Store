import express from 'express'
import mongoose from 'mongoose'
import router from './router.js';
import fileUpload from 'express-fileupload';

const PORT = 5000;
const DB_URL = 'mongodb+srv://Ficuris:Js261710@vegetables.nqshlag.mongodb.net/?appName=Vegetables'

const app = express()

app.use(express.json())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('SERVET STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()