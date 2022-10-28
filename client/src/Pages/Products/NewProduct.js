import { Button, DashboardWrapper, Input } from "../../Components";
import {FcPackage,FcBullish} from 'react-icons/fc'
export default function NewProduct(){
    return(
    <DashboardWrapper>
        <div className="px-4">
            <p className="text-blue-500 py-2 font-bold">Add Loan Product</p>
        <Input placeholder='product name'
        icon={<FcPackage/>}/>
        <Input placeholder='rate p.a'
          icon={<FcBullish/>}/>
        <div className="w-20 float-right">
        <Button title='Add'/>
        </div>
       
        </div>
       

    </DashboardWrapper>
    )
}