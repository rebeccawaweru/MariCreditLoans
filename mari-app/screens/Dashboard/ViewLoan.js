import { View,Text,ImageBackground } from "react-native";
import tw from 'tailwind-react-native-classnames';
import { getLoan,deleteLoan } from "../../redux/loanSlice";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";
import FormSubmitButton from "../../components/FormSubmitButton";

export default function ViewLoan({navigation}){
    const {product,amount,period,request,tenature,rate,interest,finalAmount,balance,initiation,due} = useSelector(state=>state.loan.loanInfo);
    const dispatch = useDispatch()
    useEffect(()=>{
      dispatch(getLoan())
    },[])
   const handleDelete =()=>{
    dispatch(deleteLoan()).then(()=>{
        navigation.navigate('MyLoans')
    });

   
   }
    return(
        <ImageBackground
        style={[tw `flex-1 `]}
         source={require('../../assets/b4.jpg')}
         >
        <View style={[tw ` p-4`]}>
         <Text>{product}</Text>
         <Text>{rate}{period}</Text>
         <Text>{amount}</Text>
         <Text>{balance}</Text>
         <Text>{request}</Text>
         <Text>{initiation}</Text>
         <Text>{due}</Text>
         <FormSubmitButton onPress={handleDelete} title='Delete'/>
        </View>
        </ImageBackground>
    )
}