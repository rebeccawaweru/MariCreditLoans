import 'react-native-gesture-handler'
import { StyleSheet} from 'react-native';
import { Provider} from 'react-redux';
import {store} from './redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
WelcomeScreen,
LoginScreen,
ApplyLoan
} from './screens';
import Dashboard from './components/Dashboard'
export default function App() {
  const Stack = createNativeStackNavigator();
  return(
  <Provider store = {store}>
  <NavigationContainer>
 <Stack.Navigator initialRouteName='Welcome'>
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
       
       }}
      />
      </Stack.Navigator>
  </NavigationContainer>
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
