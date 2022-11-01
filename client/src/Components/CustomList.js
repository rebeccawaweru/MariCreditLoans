export default function CustomList({icon,title,onClick}){
    return(
        <li className="flex text-left space-x-2  hover:text-white " onClick={onClick}>
            <div className="text-xl">
             {icon}  
            </div>
        <p className="hidden lg:block md:block xl:block 2xl:block">{title}</p>
        </li>  
    )
}