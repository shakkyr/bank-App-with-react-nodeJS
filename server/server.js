// npm i cors
//npm i nodemon
//npm i express
//npm i axios
//npm i body-parser

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const fs = require('fs')
app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



//! ===================== get all users list =================
app.get('/', (req, res) => {
    if (!fs.existsSync('./bank.json')) {
        fs.writeFileSync('./bank.json', '[]')
    }
    const buffer = JSON.parse(fs.readFileSync('./bank.json').toString())
    res.status(200).json(buffer)
    // console.log(buffer);
})

//! ======================= get individual user data ================
app.get('/:account', (req,res)=>{
    if (!fs.existsSync('./bank.json')) {
        fs.writeFileSync('./bank.json', '[]')
    }
    const buffer = JSON.parse(fs.readFileSync('./bank.json').toString())
    let account = req.params
    let thenum = account.account.replace( /^\D+/g, '');//extract just the number from the string
    let userToFind = buffer.find(usr=>{ 
        return parseInt(usr.accountNumber) === parseInt(thenum)})
    res.status(200).json(userToFind)
} )

//! ======================= add user data to the system =============
app.post('/', (req, res) => {
    let buffer = JSON.parse(fs.readFileSync('./bank.json').toString())
    if (buffer.find(itm => { 
        
        return parseInt(req.body.accountNumber) === itm.accountNumber  })) {
        return res.status(404).send('user exists')
    }

    let today = new Date();
        let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        let dateTime = date+' '+time;

    const item = {
        name: req.body.name,
        email: req.body.email,
        firstDeposit: parseFloat(req.body.firstDeposit),
        accountNumber:  parseFloat(req.body.accountNumber),
        id: parseFloat(req.body.id),
        joinedIn : dateTime

    }
    buffer = [...buffer, item]
    fs.writeFileSync('./bank.json', JSON.stringify(buffer))
    
    return res.status(201).json(item)
})

//! ========================= transfers between users =================
app.put('/', (req, res) => {
    let buffer = JSON.parse(fs.readFileSync('./bank.json').toString())
// ========================= time ====================
            let today = new Date();
            let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            let dateTime = date+' '+time;
    //  ============================================================       
            const {deposit,withdraw,transfer} = req.body;
            let user = buffer.find(usr=>{
                return usr.accountNumber === req.body.fromWho
            })

            if(!user) {
                return res.status(400).json({error: 'user is not exist'})
            }
//! ======================= deposit and withdraw =================
            let inMoney = (deposit === '' ? 0 : parseFloat(deposit))
            let outMoney = (withdraw === '' ? 0 : parseFloat(withdraw))
            if(outMoney > user.firstDeposit){
                return res.status(400).json({error: 'no enough money'})
            }
            user.firstDeposit = user.firstDeposit + inMoney - outMoney
            

      



        //     "name": "samer",
        // "email": "samer@/com",
        // "firstDeposit": 1000,
        // "accountNumber": 143444,
        // "id": 30444,
        // "joinedIn": "2021-11-13 18:7:25"
            
        const item = {
            fromWho:  parseFloat(req.body.fromWho),
            transfer:  parseFloat(req.body.transfer),
            toWho:  parseFloat(req.body.toWho),
            transictionTime : dateTime
        }
        fs.writeFileSync('./trans.json', JSON.stringify(item))
        fs.writeFileSync('./bank.json', JSON.stringify(buffer))
    
               return res.status(200).json({success: 'Item updated successfully'})


            
    })


app.listen(5000, () => {
    console.log("listening on port 5000 ");
})

// // ============== read ======================
// controlUsers.showAll().then(data=> {
//     console.log(data);
// })
// // =============== add ====================
// controlUsers.addUser('asad').then(data=>{
//     console.log(data);
// })

// // =============== delete ====================
// controlUsers.deletUserById('eni31x5rwkvr9k6xs').then(data=>{
//     console.log(data);
// })

// app.listen(5000, ()=>{
//     console.log('Listening on port 5000')
// })