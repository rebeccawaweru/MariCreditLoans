import { FcHome,FcFolder,FcElectricity} from "react-icons/fc";
import {FaUsersCog,FaBell} from "react-icons/fa";

export default function CustomSideBar(){
    return(
    <div className="h-screen fixed top-0 w-20 lg:w-40 md:w-40 xl:w-50 2xl:w-50 bg-purple-600 text-center text-white justify-center items-center">
     <div className="py-4 space-y-8 ">
     <h2 className='text-sm lg:text-xl md:text-xl xl:text-2xl 2xl:text-3xl font-bold font-Italianno'>MariCredit</h2>
      <ul className='space-y-8 px-6 lg:px-5 md:px-5 xl:px-5 2xl:px-5'>
        <li className="flex text-left space-x-2">
        <FcHome className="text-xl"/>   
        <p className="hidden lg:block md:block xl:block 2xl:block">Dashboard</p>
        </li>
        <li className="flex text-left space-x-2">
        <FaBell className="text-xl"/>
        <p className="hidden lg:block md:block xl:block 2xl:block">Notifications</p>
        </li>
        <li className="flex text-left space-x-2">
        <FaUsersCog className="text-xl"/>
        <p className="hidden lg:block md:block xl:block 2xl:block">Profile</p>
        </li>
        <li className="flex text-left space-x-2">
        <FcFolder className="text-xl"/>
        <p className="hidden lg:block md:block xl:block 2xl:block">My Loans</p>
        </li>
      </ul>
      <div className="absolute bottom-0 fixed py-2 px-5 ">
        <li className="flex text-left space-x-2">
        <FcElectricity className="text-xl"/>
        <p className="hidden lg:block md:block xl:block 2xl:block">Logout</p>
        </li>
        </div>

     </div>
    </div>
  
    )
}