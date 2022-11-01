import CustomSideBar from "./CustomSideBar";
import CustomAppBar from "./CustomAppBar";
export default function DashboardWrapper({children}){
    return(
        <div className="min-h-screen  w-full flex overflow-hidden">
        <CustomSideBar/>
        <div className="w-screen bg4">
        <CustomAppBar/>
        <div className=" items-center justify-center px-6 ml-20 lg:ml-36 md:ml-36 xl:ml-40 2xl:ml-40  ">
        {children}
        </div>
        </div>
        </div>
    )
}