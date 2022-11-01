import {Link} from "react-router-dom"
import { useSelector } from "react-redux"
import { logo2 } from "../assets";
export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    const name = useSelector(state=>state.user.name)
    return(
    <div className="mb-2">
        <div className="flex justify-center">
            <img className="h-52 w-52 -mb-10 -mt-10" alt="" src={logo2}/>
            <p>{name}</p>
        </div>
        <h2 className="font-extrabold text-center mt-2 text-3xl text-gray-900">{heading}</h2>
        <p className="mt-2 text-center text-sm text-gray-600 mt-5">{paragraph} {" "}
        <Link className="font-medium text-purple-600 hover:text-purple-500" to={linkUrl}>{linkName}</Link>
        </p>
       
    </div>
    )
}