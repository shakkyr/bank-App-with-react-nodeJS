import React from 'react'
import axios from 'axios'
// const transferMessage = document.querySelector('.transferMessage');

const BankingButtons = ({accountNumber}) => {
    const [amount, setAmount] = React.useState({
        deposit:'',
        withdraw:'',
        transfer:'',
        fromWho: accountNumber,
        toWho : '',
    })




    const inputHandler = (e)=>{
        setAmount({
            ...amount,
            [e.target.name]: e.target.value
        })
        console.log(amount);
    }

    
    const doAcountChanges = async ()=>{
    
        try {
            await axios.put(`http://localhost:5000/`,amount)
           alert(`transfared money sucssesfuly in account ${accountNumber}`)
          
            }
            catch (e){
               alert(`account ${accountNumber} dose not have enough balance`)
            }
        // axios.put(`http://localhost:5000/:${accountNumber}`,amount)
        // .then((res)=>{
        //     if(res.status ===200){
              
        //         // setItem({
        //         //     ...item,
        //         //     name:editItem.name,
        //         //     price:editItem.price
        //         // })
        //     }
        //     else {
        //         alert("Something went wrong")
        //     }
        // })
    }

  
      




    return (
        <div>
        <div><input className="account__deposit" type="button" onClick={doAcountChanges} value="deposit" /><input type="number" onChange={inputHandler} name="deposit"   placeholder='amount'/></div>
            <div><input className="account__withdraw" type="button" onClick={doAcountChanges} value="withdraw" /><input type="number" onChange={inputHandler} name="withdraw"  placeholder='amount'/></div>
            <div><input className="account__transfer" type="button" onClick={doAcountChanges} value="-->transfer<--" /><input type="number" onChange={inputHandler} name="transfer"  placeholder='amount'/> to Account number : <input type="number" onChange={inputHandler} name="toWho"  placeholder='amount'/> </div>
              <div className="transferMessage" ></div>
        </div>
    )
}

export default BankingButtons
