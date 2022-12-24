import 'react-native-gesture-handler'
import { StyleSheet} from 'react-native';
import { Provider} from 'react-redux';
import {store} from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from 'native-base';
import {
WelcomeScreen,
LoginScreen,
ApplyLoan,
MyLoans,
ViewLoan,
HomeScreen,
NewPayment
} from './screens';
import Dashboard from './components/Dashboard'
export default function App() {
  const Stack = createNativeStackNavigator();
  return(
  <Provider store = {store}>
       <NativeBaseProvider>
  <NavigationContainer>
 <Stack.Navigator initialRouteName='HomeScreen'>
 <Stack.Screen
       name='Dashboard'
       component={Dashboard}
       options={{
      headerShown:false
      }}/>
      <Stack.Screen
       name='Welcome'
       component={WelcomeScreen}
       options={{
      headerShown:false
      }}/>
      <Stack.Screen
       name='Login' 
       component={LoginScreen}
       options={{
        title:'',
        headerTransparent: true,
       }}
       />
      <Stack.Screen
       name='Apply' 
      component={ApplyLoan}
      options={{
        title:'Apply for a loan',
        headerStyle:{
          backgroundColor:'green',
        },
        headerTitleStyle: {
          color: 'white'
        }
       }}
      />
      <Stack.Screen 
      name='MyLoans' 
      component={MyLoans} 
      options={{
        title:'My Loans',
        headerStyle:{
          backgroundColor:'green',
        },
        headerTitleStyle: {
          color: 'white'
        }
      }}
      />
      <Stack.Screen 
      name='Pay' 
      component={NewPayment} 
      options={{
        title:'Make Payment',
        headerStyle:{
          backgroundColor:'green',
        },
        headerTitleStyle: {
          color: 'white'
        }
      }}
      />
      <Stack.Screen 
      name='ViewLoan' 
      component={ViewLoan} 
      options={{
        title:'Loan Information'
      }}
      />
      <Stack.Screen
      name='HomeScreen'
      component={HomeScreen}
     options={{
      headerShown:false
     }}
      />

      </Stack.Navigator>
  </NavigationContainer>
  </NativeBaseProvider>
  </Provider>
  ) 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
