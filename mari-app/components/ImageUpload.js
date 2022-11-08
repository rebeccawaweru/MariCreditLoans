import React, { useState } from 'react';
import { TouchableOpacity, View,StyleSheet,Text,Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import client from '../api/client';

const ImageUpload = ()=> {
    const user = localStorage.getItem('id')
    const [profileImage, setProfileImage] = useState('')
     const [img, setImg] = useState('');

    const openImageLibrary = async ()=>{
        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        console.log(status)
        if(status !== 'granted'){
            alert('Sorry we need camera roll permissions to upload photo')
        }
        if(status === 'granted'){
            const response = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
              });
            if(!response.cancelled){
                setProfileImage(response.uri)
                console.log(response)
            }
          
        }
    }
    const uploadProfileImage = async ()=>{
         const formData = new FormData()
         const data = new FormData()
         data.append("file", profileImage)
         data.append("upload_preset", "Images");
         const res = await fetch(
           "https://api.cloudinary.com/v1_1/marite/image/upload",
           {
             method:"POST",
             body:data
           }
         )
         const File = await res.json()
         setImg(File.url)
         console.log(File.secure_url)

         try {
             const res = await client.put(`/auth/${user}`,{
                  avatar:File.secure_url
            })
            console.log(res.data)
          
         } catch (error) {
             console.log(error.message)
         }
       
    

    }
    return (
        <>
        <View style={styles.container}>
            <View>
                <TouchableOpacity onPress={openImageLibrary} style={styles.uploadBtn}>
                {profileImage ? <Image source={{uri:profileImage}} style={{width:"100%", height:"100%"}} />: <Text style={styles.uploadBtnText}>Upload Image</Text> }
                </TouchableOpacity>
                <Text style={styles.skip}>Skip</Text>
                {profileImage ? <Text
                onPress={uploadProfileImage}
                 style={[
                styles.skip,
                 {backgroundColor:"green",color:"white",
                 borderRadius:8 },
                ]}
                >Upload
                </Text> : null}
           
            </View>
        </View>
        </>
        
    );
}
const styles = StyleSheet.create({
    container:{
      flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor: '#fff',
    },
    uploadBtn:{
        height:125,
        width:125,  
        borderRadius:125/2,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
        borderStyle:'dashed',
        borderWidth:1,
        overflow:"hidden"
    },
    uploadBtnText:{
        textAlign:"center",
        fontSize:16,
        opacity:0.3,
        fontWeight:"bold"
    },
    skip:{
        textAlign:"center",
        padding:10,
        fontSize:16,
        fontWeight:'bold',
        textTransform:'uppercase',
        letterSpacing:2,
        opacity:0.5

    }

})
export default ImageUpload;