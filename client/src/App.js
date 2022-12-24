import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'
import {
  LandingPage,
  Login,
  Signup,
  Dashboard,
  ResetPassword,
 ConfirmPassword,
 Loans,
 UpdateLoan,
 ViewLoan,
 ApplyLoan,
 NewProduct,
 Products,
 UpdateProduct,
 Payments,
 NewPayment,
 ViewPayments,
 Reports,
 Statements,
 Analysis,
 ViewStatement
} from './Pages'
function App() {
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<LandingPage/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    {/* <Route path='/dashboard' element={isLoggedin ? <Dashboard/> : <Login/>}/>  */}
    <Route path='/dashboard' element={ <Dashboard/>}/> 
    <Route path='/reset' element={<ResetPassword/>}/>
    <Route path='/confirmpassword' element={<ConfirmPassword/>}/>
    <Route path='/loans' element={<Loans/>}/>
    <Route path='/updateloan/:id' element={<UpdateLoan/>}/>
    <Route path='/viewloan/:id' element={<ViewLoan/>}/>
     <Route path='/apply' element={<ApplyLoan/>}/>
     <Route path='/newproduct' element={<NewProduct/>}/>
     <Route path='/products' element={<Products/>}/>
     <Route path='/updateproduct/:id' element={<UpdateProduct/>}/>
     <Route path='/newpayment/:id' element={<NewPayment/>}/>
     <Route path='/viewpayment/:id' element={<ViewPayments/>}/>
     <Route path='/payments' element={<Payments/>}/>
     <Route path ='/reports' element={<Reports/>}/>
     <Route path='/analysis' element={<Analysis/>}/>
     <Route path='/statements' element={<Statements/>}/>
     <Route path='/viewstatement/:id' element={<ViewStatement/>}/>
  </Routes>
  </BrowserRouter>



  </>
  );
}

export default App;
