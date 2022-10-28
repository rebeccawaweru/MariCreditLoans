export default function Steps({step,title,hidden,fixedstyle}){
  
    return(
        <div className="hidden lg:block md:block xl:block 2xl:block">
        <div className="block">
        <div className="flex">
        <div className={fixedstyle}>
            
        <p>{step}</p>
        </div>
        <div className={hidden}>
        <div className="bg-black h-0.5 w-48 mt-6"></div>
        </div>
        
        </div>
        <p>{title}</p>
        </div>
        </div>
    )
}