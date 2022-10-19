import { getUser } from "../redux/userSlice";
import { useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
export default function Dashboard(){
    const {fullname} = useSelector(state=>state.user.userInfo);
    const dispatch = useDispatch()
    useEffect(()=>{
    dispatch(getUser())
    },[dispatch,fullname])
    return(
        <div>
            <p>Welcome {fullname} </p>
        </div>
    )
}