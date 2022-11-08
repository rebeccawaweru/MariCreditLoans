import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './redux/store';
const store = configureStore();

const RNRedux = () => (
    <Provider store = { store }>
      <App />
    </Provider>
  )

registerRootComponent(App, ()=>RNRedux);