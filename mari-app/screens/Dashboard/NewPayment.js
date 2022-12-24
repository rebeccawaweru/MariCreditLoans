import { Button, ScrollView,Text, View } from "react-native"
import { Divider,Center } from "native-base";
import tw from "tailwind-react-native-classnames";
import FormContainer from "../../components/FormContainer";
import FormInput from "../../components/FormInput";
const NewPayment = ()=>{
    return(
       <ScrollView>
        <FormContainer>
            <FormInput
            placeholder="amount"/>
            <FormInput/>
            <Button title="Lipa Na Mpesa"/>
        </FormContainer>
        <Center ><Text>OR</Text></Center>
         <View style={[tw`p-4`]}>
        <Text>1.Open your sim tool kit</Text>
        <Text>2.Select Lipa na Mpesa-Paybill</Text>
        <Text>3.Enter Paybill Number:<b>4037355</b></Text>
        <Text>4.Enter Account Number:<b>6ecdcs</b></Text>
        <Text>5.Select OK</Text>
        </View>
        
       </ScrollView>
    )
}
export default NewPayment;