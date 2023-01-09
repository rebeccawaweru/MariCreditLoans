import React,{useEffect,useState} from 'react';
import { Icon } from 'react-native-elements'
import {View,Text,ImageBackground,Image,ScrollView,Button} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import tw from 'tailwind-react-native-classnames';
import FormInput from '../../components/FormInput';
import FormSubmitButton from '../../components/FormSubmitButton';
import FormContainer from '../../components/FormContainer';
import ImageUpload from '../../components/ImageUpload';
import { getProducts } from '../../redux/productSlice';
import { getUser } from '../../redux/userSlice';
import { newLoan } from '../../redux/loanSlice';
import {useDispatch,useSelector} from 'react-redux';
import { Alert } from 'react-native';
function ApplyLoan({navigation}) {
    const dispatch = useDispatch()
    const {data} = useSelector(state=>state.product);
    const {email,phonenumber,fullname} = useSelector(state=>state.user.userInfo);
    const [front,setFront] = useState('');
    const [back,setBack] = useState('');
    const [confirm,setConfirm] = useState(false);
    const [alert,setAlert] = useState(false)
    const [product2,setProduct2] = useState('')
    const [totalinterest,setTotalInterest] = useState('')
    const [values,setValues] = useState({
        job:'',
        idnumber:'',
        product:'',
        amount:'',
        tenature:'',
        period:'',
    });
    const {job,idnumber,product,amount,tenature,period} = values;
    const handleOnChangeText = (value,fieldName)=>{

        setValues({...values,[fieldName]:value});
    }
    const onchangeFront = async ()=>{
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted'){
            alert('Sorry we need camera roll permissions to upload photo')
        }
        if(status === 'granted'){
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true
              });
            if(!response.cancelled){
              const r = response.uri;
              const uriArr = r.split('.');
            const fileType = uriArr[uriArr.length - 1]
            const file = `data:${fileType};base64,${response.base64}`
                const data = new FormData()
                data.append("file", file)
                data.append("upload_preset", "Images");
                const res = await fetch(
                  "https://api.cloudinary.com/v1_1/marite/image/upload",
                  {
                    method:"POST",
                    body:data
                  }
                )
                const File = await res.json()
                setFront(File.url)
             
           
                
            }
        }
    }
    const onchangeBack = async ()=>{
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(status !== 'granted'){
            alert('Sorry we need camera roll permissions to upload photo')
        }
        if(status === 'granted'){
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64:true
              });
            if(!response.cancelled){
              const r = response.uri;
              const uriArr = r.split('.');
            const fileType = uriArr[uriArr.length - 1]
            const file = `data:${fileType};base64,${response.base64}`
                const data = new FormData()
                data.append("file", file)
                data.append("upload_preset", "Images");
                const res = await fetch(
                  "https://api.cloudinary.com/v1_1/marite/image/upload",
                  {
                    method:"POST",
                    body:data
                  }
                )
                const File = await res.json()
                setBack(File.url)
            }
        }
    }
    const handleConfirm=async()=>{
         if (!idnumber || !job || !product || !amount || !tenature || !period  ) {
            // Swal.fire({
            //     title: "Error",
            //     text: "Please fill in the required fields",
            //     icon: "error",
            //     confirmButtonText: "OK",
            //   });
          Alert.alert('Error', 'Enter missing fields')
              
        }else{
            let products = await data.filter(function (product1) {
                return product1.name == product;
            });
            setProduct2(products[0].interest);
            if(period === 'Months'){
             setTotalInterest(amount* products[0].interest/100 *tenature)  
             console.log(amount* products[0].interest/100 *tenature)  
            }else if(period === 'Weeks'){
            setTotalInterest(amount* products[0].interest/100 *tenature/4)   
            }else if(period === 'Days'){
                setTotalInterest(amount* products[0].interest/100 *tenature/30)     
            }else if(period === 'Years'){
                setTotalInterest(amount* products[0].interest/100 *tenature*12) 
                console.log(amount* products[0].interest/100 *tenature*12)
            }
           setConfirm(true)
        }
    
    }
    const handleComplete = async()=>{
        const finalAmount = Number(totalinterest) + parseInt(amount);
        dispatch(newLoan({
                fullname:fullname.toUpperCase(),
                phonenumber:phonenumber,
                email:email,
                idnumber:Number(idnumber),
                job:job,
                product:product,
                amount:Number(amount),
                period:period,
                tenature:Number(tenature),
                front:front,
                back:back,
                rate:Number(product2),
                interest:totalinterest,
                finalAmount:finalAmount,
                balance:finalAmount
        })).then((response)=>{
               if(response.payload.success){
                // Swal.fire({
                //     title: "Success",
                //     text: "Application sent successfully",
                //     icon: "success",
                //     confirmButtonText: "OK",
                //   });
                Alert.alert('Success', 'Application sent!')
                  setTimeout(()=>{
                         navigation.navigate('HomeScreen')
                  },3000)
               }
        })
    }

    useEffect(()=>{   
    
    dispatch(getProducts());
    dispatch(getUser());
    },[])
    return (
   <ImageBackground
        style={[tw `flex-1 `]}
         source={require('../../assets/b4.jpg')}
         >
      <ScrollView>
    <FormContainer>
   {!confirm ? 
   <>
    <View style={[tw `flex-1 mt-2 `]}>
    <Text style={[tw `font-bold text-sm`]}>Personal Information</Text>
    <FormInput
       label='ID Number'
        value={idnumber}
        onChangeText={value => handleOnChangeText(value,'idnumber')}
    />
    <FormInput 
         label='Occupation'
         value={job}
         onChangeText={value => handleOnChangeText(value,'job')}
    />
        <Text style={[tw `font-bold text-sm`]}>Uploads</Text>
       <View style={[tw`flex-row p-2 `]}>
       <ImageUpload onChange={onchangeFront} ID={front} title="Front ID"/>
        <ImageUpload onChange={onchangeBack} ID={back} title="Back ID"/>
       </View>
        <Text style={[tw `font-bold text-sm mb-2 mt-2`]}>Product Information</Text>
        <Text>Choose Loan Product</Text>
        <Picker
        selectedValue={product}
        style={[tw `mb-3 mt-2 rounded-md  relative  w-full  px-3 py-2 border border-gray-300  text-gray-900`]}
        onValueChange={(value, itemIndex) => handleOnChangeText(value,'product')}
      >
        <Picker.Item value='' label='Choose Loan Product'/>
       {data.map((item,key)=>{
        return <Picker.Item key={key} value={item.name} label={item.name + " " + item.interest+ "% p.m"} />
       })}
      </Picker>
        <FormInput 

        label='Amount'
        value={amount}
        onChangeText={value => handleOnChangeText(value,'amount')}/>
        <Text style={[tw `font-bold text-sm`]}>Loan Period</Text>
        <View style={[tw `flex-row w-full `]}>
        <FormInput 
        //  width='50%'
     
        value={tenature}
        onChangeText={value => handleOnChangeText(value,'tenature')}
        placeholder='e.g 3'/>
        <Picker
        selectedValue={period}
        style={[tw `mb-3 mx-2 rounded-md w-52 px-3 py-2 border border-gray-500  text-gray-900`]}
        onValueChange={(value, itemIndex) => handleOnChangeText(value, 'period')}
      >
       <Picker.Item label="Period Unit" value="" />
        <Picker.Item label="Years" value="Years" />
        <Picker.Item label="Months" value="Months" />
        <Picker.Item label="Weeks" value="Weeks" />
        <Picker.Item label="Days" value="Days" />
      </Picker>
      </View>
        <FormSubmitButton onPress={handleConfirm} title='Proceed'/>
    </View>
   </> : 
   <>
        {/* confirm */}
        <View style={[tw `mt-2`]}>
            <Text>Preview</Text>
    <Text style={[tw `font-bold text-sm mb-2 mt-2`]}>Personal Information</Text>
    <View style={[tw `flex flex-row justify-around`]}>

    <View style={[tw `flex flex-row`]}>
    <Icon
    name='person-outline'
    type='ionicon'
    color='green'
    />
    <Text>{fullname}</Text>
    </View>
    <View style={[tw `flex flex-row`]}>
    <Icon
    name='envelope'
    type='font-awesome'
    color='green'
    />
    <Text>{email}</Text>
    </View>
  
    </View>

    <View style={[tw `flex flex-row justify-around mt-4`]}>
    <View style={[tw `flex flex-row`]}>
    <Icon
    name='phone'
    type='font-awesome'
    color='green'
     />
    <Text>{phonenumber}</Text>
    </View>
    <View style={[tw `flex flex-row`]}>
    <Icon
    name='id-badge'
    type='font-awesome'
    color='green'
     />
     <Text>{idnumber}</Text>
    </View>
    <View style={[tw `flex flex-row`]}>
    <Icon
    name='briefcase-outline'
    type='ionicon'
    color='green'
    />
     <Text>{job}</Text>
    </View>
    </View>

    <Text style={[tw `font-bold text-sm mb-2 mt-2`]}>Product Information</Text>
    <View style={[tw `flex flex-row justify-around mt-2`]}>

    <View>
    <Text>Loan Product</Text>
    <View style={[tw `flex flex-row mt-2`]}>
    <Icon
    name='cube-outline'
    type='ionicon'
    color='green'
    />
    <Text>{product}</Text>
    </View>
    </View>

    <View>
    <Text>Principal</Text>
    <View style={[tw `flex flex-row mt-2`]}>
    <Icon
    name='money'
    type='font-awesome'
    color='green'
     />
    <Text>{amount}</Text>
    </View>
    </View>

    <View>
    <Text>Period</Text>
    <View style={[tw `flex flex-row mt-2`]}>
    <Icon
    name='hourglass-outline'
    type='ionicon'
    color='green'
    />
    <Text>{tenature}{period}</Text>
    </View>
    </View>
   </View>

   <Text style={[tw `font-bold text-sm mb-2 mt-2`]}>Uploads</Text>
    <View style={[tw `flex-row justify-around`]}>
     {front ? <Image source={{uri:front}} style={[tw`h-52 w-52 mx-1`]}/>: <Text>No Front ID to display</Text>}
     {back ? <Image source={{uri:back}} style={[tw`h-52 w-52`]}/>: <Text>No Back ID to display</Text>}
    </View>
    </View>
    <View style={[tw `flex-row justify-between mt-2`]}>
    <Icon
    reverse
    name='arrow-back'
    type='ionicon'
    onPress={()=>setConfirm(false)}/>
  
    <FormSubmitButton onPress={handleComplete } title="Apply" width="20%"/>
    </View>
   </>  } 
   </FormContainer>
   </ScrollView>
    </ImageBackground>
    );
}


export default ApplyLoan;