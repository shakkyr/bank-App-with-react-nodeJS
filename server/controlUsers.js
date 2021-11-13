const fs = require('fs');

//! ====================== 1- read data =====================
const showAll = () => {
    return new Promise((resolve, reject)=>{
        fs.readFile('users.json' , (err,data)=>{
            if (err) {
                reject(err);
            }
            resolve(JSON.parse(data.toString()))
        }) 
    })
}

//! =========================== 2- add data ==========================

const addUser = async (name, email,id) => {
    const data = await showAll();
    const user = data.users.find(usr =>usr.name=== name );
    if (user){
        return false;
    }
    let allUsers = data.users;
    allUsers.push({
        name: name,
        email: email,
        id : id
    });
    fs.writeFile('users.json' , JSON.stringify(data), (err)=> {
        if (err){
            log(err);
        }
    })
}

//! ======================== 3 delet users =======================
const deletUserById = async (id)=>{
    const data = await showAll();
    const user = data.users.filter(usr=> usr.id !==id)
    data.users=user
    fs.writeFile('users.json',JSON.stringify(data), (err)=>{
        if (err){
            log(err);
        }

    })
}




//! ========================== export all functions ================
module.exports = {
    showAll,
    addUser,
    deletUserById,


}