//line token: wWxQINIGiWG16FNGBac4RhIlFVrpJ38PkkTgbjBpM7P

//Realtime Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, get, update } from "firebase/database";
import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors'
import axios from "axios";

var app2 = express();
app2.use(cors({origin:'http://localhost:3000'}));
app2.use(bodyParser.json());
app2.use(bodyParser.urlencoded({extended: true}))
var server = app2.listen(5000, console.log('Server is running on port 5000'))

const firebaseConfig = {
    databaseURL: "https://fir-laundry-company-default-rtdb.firebaseio.com/"
}

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

//get
app2.get('/api/get', (req, res) => {
    try {
        get(ref(db, 'allMachines'))
        .then((snapshot) => {
            console.log(snapshot.val())
            if(snapshot.exists()) {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: snapshot.val()
                })
            }else {
                return res.status(200).json({
                    RespCode: 200,
                    RespMessage: 'good',
                    Result: 'not found data'
                })
            }
        })
        .catch((err2) => {
            console.log(err2)
            return res.status(500).json({
                RespCode: 500,
                RespMessage: err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//put
app2.put('/api/update', (req, res) => {
    var id = req.body.id
    var status = req.body.status

    try {
        var updates = {};
        updates[`allMachines/${id}/status`] = status;

        update(ref(db), updates)
        .then(() => {
            return res.status(200).json({
                RespCode: 200,
                RespMessage: 'good'
            })
        })
        .catch((err2) => {
            return res.status(500).json({
                RespCode: 500,
                RespMessage: 'bad' + err2.message
            })
        })
    }
    catch(err) {
        console.log(err)
        return res.status(500).json({
            RespCode: 500,
            RespMessage: err.message
        })
    }
})

//Line notify
app2.post('/api/send-notify', async(req, res) => {
    const res2 = await axios.post('https://notify-api.line.me/api/notify', {
        message: 'Your laundry almost finish!'
    }, {headers: {
        'Authorization': 'Bearer wWxQINIGiWG16FNGBac4RhIlFVrpJ38PkkTgbjBpM7P',
        'Content-Type': 'application/x-www-form-urlencoded'
    }})
    res.json(res2.body)
    // console.log(res)
})