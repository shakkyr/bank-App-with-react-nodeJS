import React from 'react'
import axios from 'axios'
import UserInfo from './UserInfo'

const AllCostumers = () => {
    const [costumers, setCostumers] = React.useState([])


    React.useEffect(()=>{
        getUsers()
    },[])

    const getUsers = ()=> {
        axios.get('http://localhost:5000/').then(res=>{
            setCostumers(res.data)
            
        })
    }
    console.log(costumers);
    return (
      <div className="users__container">
          {costumers.map(usr=>{
              return (
                <div className="users__left">
                <h5>Account Number: <UserInfo accountNumber={usr.accountNumber} name={usr.accountNumber} /> </h5>
                costumer :{usr.name}
                Account Balance : {usr.firstDeposit} ש"ח
                <h6>Costumer id: {usr.id}</h6>
                 
                </div>
                )
          })}
      </div>
    )
}

export default AllCostumers
