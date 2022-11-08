import React from 'react';
import { ImageBackground, StyleSheet,View,Text, TouchableHighlight,Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
function WelcomeScreen({navigation}) {
    return (
     <>
     
    <ImageBackground
    style={styles.background}
    source={require('../../assets/bg1.jpg')}>
  <LinearGradient
      colors={['rgba(0,0,0,0.6)','rgba(0,0,0,0.7)' ]}
      style={{flex: 1, justifyContent: 'center'}}>
           <Image source={require('../../assets/logo2.png')} style={{height:160,width:250,alignSelf:'center'}}/>
    </LinearGradient>
           </ImageBackground>
    <View style={styles.title}>
    <Text style={styles.text}>Welcome to MariCredit</Text>
    
    </View>
    <View 
    style={styles.loginButton}>
    <TouchableHighlight style={styles.loginButton} onPress={()=>navigation.navigate('LoginScreen')}>
    <Text style={styles.start}>GET STARTED</Text>
    </TouchableHighlight>
    </View>

    </>
    );
}
const styles = StyleSheet.create({
    background:{
        flex:1,
       

    },
    loginButton:{
       width:"100%",
       height:70,
       backgroundColor:"green",
       alignItems:"center",
       justifyContent:"center"
    },
    title:{
     position:"absolute",
     top:400,
     right:50,
     left:50,
     justifyContent:"center",
     alignItems:'center',
     textAlign:'center'
    },
    text:{
        color:"white",
        fontWeight:"bold",
        fontSize: 30,
        fontFamily:"Lucida Handwriting"
      
    },
    start:{
        color:"white",
        fontWeight:"bold", 
        fontSize: 15,
    }
})
export default WelcomeScreen;