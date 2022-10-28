import CustomSideBar from "./CustomSideBar";
import CustomAppBar from "./CustomAppBar";
export default function DashboardWrapper({children}){
    return(
        <div className="min-h-screen  w-full flex overflow-hidden">
        <CustomSideBar/>
        <div className="w-screen">
        <CustomAppBar/>
        <div className="items-center justify-center ml-20 lg:ml-36 md:ml-30 xl:ml-40 2xl:ml-40 ">
        {children}
        </div>
  
        </div>
        </div>
    )
}