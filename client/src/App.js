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
 ConfirmPassword,
 ApplyLoan,
 NewProduct,
 Products
} from './Pages'
function App() {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    {/* <Route path='/dashboard' element={isLoggedin ? <Dashboard/> : <Login/>}/>  */}
    <Route path='/dashboard' element={ <Dashboard/>}/> 
    <Route path='/reset' element={<ResetPassword/>}/>
    <Route path='/confirmpassword' element={<ConfirmPassword/>}/>
     <Route path='/apply' element={<ApplyLoan/>}/>
     <Route path='/newproduct' element={<NewProduct/>}/>
     <Route path='/products' element={<Products/>}/>
  </Routes>
  </BrowserRouter>



  </>
  );
}

export default App;
