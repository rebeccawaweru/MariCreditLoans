import React,{useEffect, useState} from 'react'
import client from '../api/client'
import {View,StyleSheet,ScrollView,Text} from 'react-native'
import Card from './Card'
 const MyLoans = ({navigation})=>{
     const user = localStorage.getItem('id')
     const [loandata,setLoandata] = useState([])
     const [phone, setPhone] = useState('')
     useEffect(()=>{
      client.get('/auth/'+user)
      .then((response)=>{
       localStorage.setItem('phone',response.data.user.phonenumber)
    })
  },[])
    useEffect(()=>{
        client.get("/loans/userloans/"+localStorage.getItem('phone')+"/"+user)
        .then((response)=>{
          setLoandata(response.data.loan)
      })
    .catch((error)=>{
        console.log(error)
    });
    },[])
    return(
        <ScrollView style={styles.container}>
          
        {loandata.map((loan,key)=>{
          return(
            <Card key={key}>
               <Text>Loan product: {loan.product}</Text>
               <Text>Rate: {loan.rate}%p.a</Text>
               <Text>Principal : Ksh{" "} {loan.amount}</Text>
               <Text>Interest: Ksh{" "}{loan.interest}</Text>
               <Text>Total Amount: Ksh{" "} {loan.finalAmount}</Text>
               <Text>Duration: {loan.tenature} {loan.period}</Text>
               <Text>Date: {loan.requestedOn}</Text>
               <Text>Status: {loan.request}</Text>
               <Text>Arrears: 0</Text>
            </Card>
          )
        })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:5,
        fontSize: 35,
        marginTop:20

    }, 
     item: {
        padding: 10,
  
        height: 44,
      },
})

export default MyLoans
