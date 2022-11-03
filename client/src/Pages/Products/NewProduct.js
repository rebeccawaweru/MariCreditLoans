import { DashboardWrapper, Input,Toast } from "../../Components";
import {FcPackage,FcBullish} from 'react-icons/fc'
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { newProduct} from "../../redux/productSlice";
import { useState } from "react";
export default function NewProduct(){
    const {fullname} = useSelector(state=>state.user.userInfo)
    const {success} = useSelector(state=>state.product)
    const [name,setName] = useState('');
    const [rate,setRate] = useState('');
    const [per,setPer] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSubmit =(e)=>{
        e.preventDefault()
        dispatch(newProduct({
            name:name,
            interest:Number(rate),
            per:'p.m',
            addedBy:fullname
        }))
        if(success){
            setTimeout(()=>{
                navigate('/products')
            },3000)
        }
    }
    return(
    <DashboardWrapper>
        <Toast/>
        <div className="px-4">
        <p className="text-blue-500 py-2 font-bold">Add Loan Product</p>
        <Input label='Product' value={name} handleChange={(e)=>setName(e.target.value)} placeholder='product name'
        icon={<FcPackage/>}/>
        <div className="grid grid-cols-2 space-x-2">
        <Input label='Rate' value={rate} handleChange={(e)=>setRate(e.target.value)} placeholder='rate %'
          icon={<FcBullish/>}/>
          <select
          defaultValue='p.m'
          value={per}
          onChange={(e)=>setPer(e.target.value)}
          className=" h-14 mt-5  rounded-md appearance-none relative block w-full  px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
            <option value='p.m'>p.m</option>
            {/* <option value='p.a'>p.a</option> */}
          </select>
        </div>
      
          <div className='flex justify-between mt-4'>
            <Button variant="contained" color="primary" onClick={()=>navigate('/products')}>Back</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>Add</Button>
          </div>
        </div>
    </DashboardWrapper>
    )
}