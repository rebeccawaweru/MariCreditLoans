import { FcApproval } from "react-icons/fc";
export default function CustomAppBar(){
    return(
    <div className="h-16  w-full bg-slate-100 text-center items-center justify-center py-4 px-2">
        <div className="flex float-right">
        <FcApproval className="text-2xl"/>
        <p> Rebecca Waweru</p>
        </div>
   </div>    
    )
}