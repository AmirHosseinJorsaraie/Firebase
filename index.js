import express from 'express';
import firebase from './config.js';
const app = express()
app.use(express.json())
app.post('/singup', async(req,res)=>{
    const {email , password} = req.body
    firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then((data)=>{
        return res.status(200).json(data)
    })
    .catch(function(error){
        let errorCode = error.code
        let errorMessage = error.message
        if(errorCode == "auth/weak-password"){
            return res.status(500).json({error: errorMessage})
        }
        else{   
            return res.status(500).json({error : errorMessage})
        }
    })
})


app.listen(4000,()=> console.log('app is lissingngi bro'))