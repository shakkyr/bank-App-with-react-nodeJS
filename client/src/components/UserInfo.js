import React from 'react'
import axios from 'axios';

const UserInfo = ({accountNumber , name}) => {
    const [user, setUser] = React.useState([]);
    const [trans, setTrans] = React.useState(false);



    const fetchUser = () =>{
        axios.get(`http://localhost:5000/:${accountNumber}`).then(res=>{
            setUser(res.data)
            setTrans(!trans)
    }
        )
}

    return (
        <div>
            <input type="button" value={accountNumber} name={name} onClick={fetchUser} />
            <div>{!trans ? '' :"mays"}</div>
        </div>
    )
}

export default UserInfo
