import React,{useEffect, useState} from 'react';
import { StyleSheet, View,ScrollView,} from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import { myloans,getLoan} from '../../redux/loanSlice';
import { getUser } from '../../redux/userSlice';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable} from 'react-native-paper';
import CustomModal from "../../components/CustomModal";
import { Button, useDisclose } from 'native-base';

function MyLoans({navigation}) {
  const {isOpen,onOpen,onClose} = useDisclose()
    const dispatch = useDispatch()
    const {email} = useSelector(state=>state.user.userInfo);
    const {loanID,fullname,product,amount,period,request,tenature,rate,interest,finalAmount,balance,initiation,due} = useSelector(state=>state.loan.loanInfo);
    const [data,setData]= useState([])
    async function findLoan(){
        await AsyncStorage.setItem('email',email).then(()=>{
          dispatch(myloans()).then((res)=>{
            setData(res.payload)
       
          })
        })
    }
    const handleView = async (id)=>{
     await AsyncStorage.setItem('loan', id);
     dispatch(getLoan())
     
    }
 

    useEffect(()=>{
       dispatch(getUser()).then(()=>{
        findLoan()
       }) 
    },[dispatch])
   
    return (
        <View style={[tw `flex-1  `]}>
          <ScrollView>
          <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
      <DataTable.Title>Product</DataTable.Title>
        <DataTable.Title>Principal</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
    
        <DataTable.Title>Action</DataTable.Title>
      </DataTable.Header>
        {data.map((info)=>{
        return <DataTable.Row key={info._id}>
        <DataTable.Cell>{info.product}</DataTable.Cell>
        <DataTable.Cell>{info.amount}</DataTable.Cell>
        <DataTable.Cell>{info.request}</DataTable.Cell>
    
        <DataTable.Cell onPress={()=>onOpen(handleView(info._id))}>
         View
        </DataTable.Cell>
        
        </DataTable.Row>
        })}
    </DataTable>
 
    </ScrollView>
    <CustomModal
     loanID={loanID} 
     product={product} 
     principal={amount}
     rate={(tenature+period).toString()}
     initiation={initiation}
     due={due}
   
     request={request}
     isOpen={isOpen} 
     onClose={onClose}/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: 'transparent',
  },
});
export default MyLoans;