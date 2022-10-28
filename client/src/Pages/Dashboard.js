import { getUser } from "../redux/userSlice";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { DashboardWrapper } from "../Components";
import { Home } from "./Components";
import Loans from "./Loans";
export default function Dashboard(){
    const {fullname} = useSelector(state=>state.user.userInfo);
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getUser());
    },[dispatch,fullname])
    return(
     <DashboardWrapper>
     <Loans/>
     </DashboardWrapper>
    )
}