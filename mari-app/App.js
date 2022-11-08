import 'react-native-gesture-handler'
import { StyleSheet} from 'react-native';
import { Provider} from 'react-redux';
import {store} from './redux/store';
import Toast from "react-native-toast-notifications";
import { ToastProvider } from 'react-native-toast-notifications'
import {
WelcomeScreen,
LoginScreen
} from './screens/Auth'
export default function App() {
  return(
  <Provider store = {store}>
 
    <LoginScreen />

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
