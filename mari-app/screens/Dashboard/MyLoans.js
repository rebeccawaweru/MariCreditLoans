import React,{useEffect, useState} from 'react';
import { StyleSheet, View,ScrollView } from 'react-native';
import {useDispatch,useSelector} from 'react-redux';
import { myloans } from '../../redux/loanSlice';
import { getUser } from '../../redux/userSlice';
import tw from 'tailwind-react-native-classnames';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataTable,Button } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

function MyLoans({navigation}) {
    const dispatch = useDispatch()
    const {email} = useSelector(state=>state.user.userInfo);
    const [data,setData]= useState([])
    async function findLoan(){
        await AsyncStorage.setItem('email',email).then(()=>{
          dispatch(myloans()).then((res)=>{
            setData(res.payload)
            console.log(res.payload)
          })
        })
    }
    const handleView = (id)=>{
      console.log(id)
    }
    useEffect(()=>{
       dispatch(getUser()).then(()=>{
        findLoan()
       }) 
    },[dispatch])
   
    return (
        <View style={[tw `flex-1 mt-2 `]}>
          <ScrollView>
          <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Product</DataTable.Title>
        <DataTable.Title>Principal</DataTable.Title>
        <DataTable.Title>Status</DataTable.Title>
      </DataTable.Header>
        {data.map((info)=>{
        return <DataTable.Row key={info._id}>
        <DataTable.Cell>{info.product}</DataTable.Cell>
        <DataTable.Cell>{info.amount}</DataTable.Cell>
        <DataTable.Cell>{info.request}</DataTable.Cell>
        <DataTable.Cell onPress={()=>handleView(info._id)}>
           View
        </DataTable.Cell>
        </DataTable.Row>
        })}
    </DataTable>
          </ScrollView>
            {/* <Text>Hey</Text>
            {data.map((p)=>{
               return <View style={[tw `flex-1 mt-2 `]}  key={p._id}><Text>{p.email}</Text></View> 
            })} */}
           {/* <Box sx={{ height: 450,
       width: '100%',
       fontFamily:'arial',
       '& .rejected': {
        backgroundColor: '#ff943975',
        color: '#1a3e72',
      },
      '& .approved': {
        backgroundColor: 'lightgreen',
        color: '#1a3e72',
      }, }}>
        <DataGrid
        rows={data}
        columns={columns}
        getCellClassName={(params) => {
          if (params.value === 'Rejected') {
            return params.value ='rejected' ;
          }
          return params.value === 'Approved' ? 'approved' : null;
        }}
        pageSize={6}
        rowsPerPageOptions={[6]}
        experimentalFeatures={{ newEditingApi: true }}
        getRowId={(row)=>row._id}
      
      />
        </Box>     */}
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: 'lightblue',
  },
});
export default MyLoans;