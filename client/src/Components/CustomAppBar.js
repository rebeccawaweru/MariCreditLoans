import { useEffect } from "react";
import { FcApproval } from "react-icons/fc";
import { useDispatch,useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";
export default function CustomAppBar(){
    const dispatch = useDispatch()
    const {fullname} = useSelector(state=>state.user.userInfo)
    useEffect(()=>{
        dispatch(getUser())
    },[dispatch,fullname])
    return(
    <div className="h-16  w-full bg-slate-100 text-center items-center justify-center py-4 px-2">
        <div className="flex float-right">
        <FcApproval className="text-2xl"/>
        <p>{fullname}</p>
        </div>
   </div>    
    )
}