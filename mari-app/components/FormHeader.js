import React from 'react';
import {View,StyleSheet,Text,Animated} from 'react-native'
function FormHeader(
{
leftHeading,
rightHeading,
subheading,
leftHeaderTranslateX = 40,
rightHeaderTranslateY = -20,
rightHeaderOpacity = 0,
}) {
    return (
     <>
         <View style={styles.container}>
         <Animated.Text
          style={[
            styles.heading,
            { transform: [{ translateX: leftHeaderTranslateX}] },
            ]}>
            {leftHeading}
            </Animated.Text>
         <Animated.Text 
         style={[styles.heading,
           
            {
                opacity: rightHeaderOpacity,
                transform: [{ translateY: rightHeaderTranslateY }],
              },
         ]}>
        {rightHeading}
        </Animated.Text>
         </View>
         <Text style={styles.subheading}>{subheading}</Text>
     </>
    );
}
const styles = StyleSheet.create({
    container:{
        flexDirection:'row', justifyContent:"center", alignItems:"center"
    },
    heading:{
        fontSize:30, 
        fontWeight:'bold'
    },
    subheading:{
     fontSize:18, color:"black",textAlign:"center"
    }
})

export default FormHeader;