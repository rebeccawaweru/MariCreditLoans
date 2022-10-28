export default function Details({icon,detail}){
    return(
       
        <div className="flex mt-2 ">
            <div className="text-4xl text-green-500">
            {icon}
            </div>
        <p className="text-lg">{detail}</p>
        </div>
        
    )
}