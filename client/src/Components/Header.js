import {Link} from "react-router-dom"
import { useSelector } from "react-redux"
export default function Header({
    heading,
    paragraph,
    linkName,
    linkUrl="#"
}){
    const name = useSelector(state=>state.user.name)
    return(
    <div className="mb-10">
        <div className="flex justify-center">
            <img className="h-14 w-14" alt="" src="https://ik.imagekit.io/pibjyepn7p9/Lilac_Navy_Simple_Line_Business_Logo_CGktk8RHK.png?ik-sdk-version=javascript-1.4.3&updatedAt=1649962071315"/>
            <p>{name}</p>
        </div>
        <h2 className="font-extrabold text-center mt-6 text-3xl text-gray-900">{heading}</h2>
        <p className="mt-2 text-center text-sm text-gray-600 mt-5">{paragraph} {" "}
        <Link className="font-medium text-purple-600 hover:text-purple-500" to={linkUrl}>{linkName}</Link>
        </p>
       
    </div>
    )
}