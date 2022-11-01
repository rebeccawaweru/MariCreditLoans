import { FcHome,FcOpenedFolder,FcBookmark,FcElectricity,FcAdvertising,FcMoneyTransfer,FcPackage,FcUpLeft,FcDataProtection} from "react-icons/fc";
import CustomList from "./CustomList";
import { useNavigate } from "react-router-dom";
import { logout,reset } from "../redux/userSlice";
import { useDispatch } from "react-redux";
export default function CustomSideBar(){
  const dispatch =  useDispatch();
  const navigate = useNavigate();
  const handleLogout = (e)=>{
    
     dispatch(logout())
    navigate('/login')
  

  }
    return(
    <div className="h-screen fixed top-0 w-20 lg:w-40 md:w-40 xl:w-50 2xl:w-50 bg-green-500 text-center text-black justify-center items-center">
     <div className="py-4 space-y-8 ">
     <h2 className='text-sm lg:text-xl md:text-xl xl:text-2xl 2xl:text-3xl font-bold font-Italianno'>MariCredit</h2>
      <ul className='space-y-8 px-6 lg:px-5 md:px-5 xl:px-5 2xl:px-5'>
        <CustomList icon={<FcHome/>} title="Dashboard" onClick={()=>navigate('/dashboard')}/>
        <CustomList icon={<FcDataProtection/>} title="Loans" onClick={()=>navigate('/loans')}/>
        <CustomList icon={<FcPackage/>} title="Products" onClick={()=>navigate('/products')}/>
        <CustomList icon={<FcAdvertising/>} title="Notifications"/>
        <CustomList icon={<FcMoneyTransfer/>} title="Payments" onClick={()=>navigate('/payments')}/>
        <CustomList icon={<FcOpenedFolder/>} title="Reports" />
      </ul>
      <div className="absolute bottom-0 fixed py-2 px-5 ">
      <CustomList icon={<FcUpLeft/>} title="Logout" onClick={handleLogout}/>
        </div>

     </div>
    </div>
  
    )
}