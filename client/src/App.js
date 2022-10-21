import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import {
  Login,
  Signup,
  Dashboard,
  ResetPassword,
 ConfirmPassword
} from './Pages'
function App() {
  return (
  <div className="h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px:8">
    <div className="max-w-md w-full space-y-8">
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/reset' element={<ResetPassword/>}/>
    <Route path='/confirmpassword' element={<ConfirmPassword/>}/>
  </Routes>
  </BrowserRouter>
  </div>
  </div>
  );
}

export default App;
