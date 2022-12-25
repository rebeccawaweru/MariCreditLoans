import {View,Text,Image,ScrollView,Button} from 'react-native';
import { ImageBackground } from 'react-native';
import tw from 'tailwind-react-native-classnames';
import {getUser} from '../../redux/userSlice'
import { useSelector,useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Icon } from 'react-native-elements'
import { Center, HStack, VStack } from 'native-base';
import client from '../../api/client';
export default function HomeScreen({navigation}){
    const dispatch = useDispatch();
    const [loan,setLoan] = useState([])
    const [reducing,setReducing] = useState(0)
    const {fullname,email} = useSelector(state=>state.user.userInfo);
    useEffect(()=>{
      dispatch(getUser()).then((response)=>{
        console.log(response.payload.email)
        client.post('/myloans/'+response.payload.email).then((response)=>{
          console.log(response.data.loan[0].balance)
           const date = new Date().toISOString().slice(0, 10)
           const days = new Date(date.replace(/-/g, "/")).getTime() - new Date(response.data.loan[0].initiation.replace(/-/g, "/")).getTime();
           const newrate = 1/30*response.data.loan[0].rate/100;
           setReducing((response.data.loan[0].balance * newrate *days/(60 * 60 * 24 * 1000)) + response.data.loan[0].balance)
   
       })
      });
   


      },[dispatch])
    return(
    <ImageBackground
    style={[tw `flex-1 p-4`]}
    source={require('../../assets/b4.jpg')}>
      <View style={[tw`flex flex-row justify-between -mt-4`]}>
      <Image source={require('../../assets/logo2.png')} style={[tw`h-28 w-28 -mx-4`]}/>
      <View  style={[tw`top-6 absolute right-0 `]}>
      <Icon
      solid='true'
      name='power'
      type='ionicon'
      color='green'
      size={25}
      onPress={()=>navigation.navigate('Login')}
     />
     </View>
      </View>

    <Text style={[tw`font-bold text-lg`]}>Hi,{fullname}</Text>
    <Text>Let's get started!</Text>
    
    <View style={[tw`mt-4`]}>
    <HStack space={4}>
      <HStack space={2}>
        <Icon
      type='ionicon'
      name='wallet-outline'
      color='green'
      size={15}
      />
      <HStack space={1}>
    <Text>Balance</Text> 
       <Text><b>{Math.round(reducing).toLocaleString()}</b></Text> 
      </HStack>
  
      </HStack>

      <HStack space={2}>
      <Icon
      type='ionicon'
      name='wallet-outline'
      color='green'
      size={15}
      />
      <Text onPress={()=>navigation.navigate('Pay')}>Pay</Text> 
      </HStack>

    </HStack>
</View>

    <View onPress={()=>navigation.navigate('Apply')} style={[tw `h-32 mt-2 w-full rounded-md bg-green-300 relative `]}>
      <Text style={[tw`font-bold text-lg mx-4 my-4`]}>Apply for a loan today!</Text>
     <View  style={[tw`absolute -right-2 -bottom-2`]}>
      <Icon
      solid='true'
      name='add-circle'
      type='ionicon'
      color='black'
      size={35}
      onPress={()=>navigation.navigate('Apply')}
     />
     </View>
    </View>
    <View style={[tw`bg-indigo-600 h-32 w-full rounded-md mt-2`]}>
    <Text style={[tw`font-bold text-lg mx-4 my-4 text-white`]}>My Loans</Text>
    <View  style={[tw`absolute -right-2 -bottom-2`]}>
      <Icon
      solid='true'
      name='arrow-forward-circle'
      type='ionicon'
      color='white'
      size={35}
      onPress={()=>navigation.navigate('MyLoans')}
     />
     </View>
    </View>
    </ImageBackground>
    )
}