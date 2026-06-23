import express from 'express'
import mongoose from 'mongoose'
import router from './Routers/router.js';
import fileUpload from 'express-fileupload';

const PORT = 3000;
const DB_URL = "mongodb://Ficuris:Js261710@ac-t3dojwh-shard-00-00.nqshlag.mongodb.net:27017,ac-t3dojwh-shard-00-01.nqshlag.mongodb.net:27017,ac-t3dojwh-shard-00-02.nqshlag.mongodb.net:27017/Vegetables?ssl=true&replicaSet=atlas-12ev22-shard-0&authSource=admin&retryWrites=true&w=majority";

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)


async function startApp() {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT, () => console.log('SERVER STARTED ON PORT ' + PORT))
    } catch (e) {
        console.log(e)
    }
}

startApp()
