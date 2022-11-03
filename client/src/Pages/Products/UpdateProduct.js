import { useEffect, useState } from "react";
import { DashboardWrapper, Input,Toast } from "../../Components";
import { Button } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { getProduct,updateProduct } from "../../redux/productSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function UpdateProduct(){
    const navigate = useNavigate()
    const {fullname} = useSelector(state=>state.user.userInfo);
    const {name,interest,addedBy,per} = useSelector(state=>state.product.productInfo)
    const [productName, setproductName] = useState('')
    const [rate,setRate] = useState('')
    const [p,setP] = useState('')
    const dispatch = useDispatch();
    const handleSubmit = async(e)=>{
        e.preventDefault()
      // if(fullname !== addedBy){
      //   toast.error('Only updated by user who added the product')
      // }else{
        
      // }
      dispatch(updateProduct({
        name:productName || name,
        interest:Number(rate) || interest,
        per:'p.m' || per,
        addedBy: fullname,
    })).then((response)=>{
      if(response.payload.success){
       setTimeout(()=>{
           navigate('/products')
       },3000)
      }
    })
    }
    useEffect(()=>{
      dispatch(getProduct())
    },[])
    return(
        <DashboardWrapper>
            <Toast/>
             <p className="text-blue-500 py-2 font-bold">Update Product</p>
            <Input label='Product Name' value={productName} handleChange={(e)=>setproductName(e.target.value)} placeholder={name}/>
            <div className="grid grid-cols-2 space-x-2">
            <Input label='Rate' value={rate} handleChange={(e)=>setRate(e.target.value)} placeholder={String(interest)}/>
            <select
            defaultValue={per}
            value={p}
            onChange={(e)=>setP(e.target.value)}
            className=" h-14 mt-5  rounded-md appearance-none relative block w-full  px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
                <option value={per}>{per}</option>
             <option value='p.m'>p.m</option>
             {/* <option value='p.a'>p.a</option> */}
            </select>
            </div>
            <div className='flex justify-between'>
            <Button variant="contained" color="primary" onClick={()=>navigate('/products')}>Back</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>Update</Button>
          </div>
        </DashboardWrapper>
    )
}