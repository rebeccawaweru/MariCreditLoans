import { Button, DashboardWrapper,Input,Toast } from "../../Components";
import { FcNext,FcPrevious,FcClock,FcMoneyTransfer,FcBriefcase,FcPackage,FcPhone,} from "react-icons/fc";
import {TiBusinessCard} from "react-icons/ti"
import {TfiEmail} from 'react-icons/tfi'
import {MdOutlinePersonPin} from 'react-icons/md'
import {CgSandClock} from 'react-icons/cg'
import {GiReceiveMoney} from 'react-icons/gi'
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Details } from "../Components";
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import { newLoan } from "../../redux/loanSlice";
import { getProducts } from "../../redux/productSlice";
const regx = /^\d{10}$/;
const ApplyLoan = ()=>{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {data} = useSelector(state=>state.product)
    const validationSchema = Yup.object({
        fullname:Yup.string().required('Kindly enter fullname as it appears in your ID').trim().min(6,'Kindly enter fullname as it appears in your ID' ),
        email:Yup.string().email('Invalid Email').required('Email is required'),
        phonenumber:Yup.string().matches(regx,'Invalid phonenumber').required('Phone Number is required'),
        id:Yup.string().required('ID Number is required').matches(/^[0-9]+$/, "Must be only digits").trim().min(8,'ID must have 8 digits').trim().max(8, 'ID must have 8 digits'),
        job:Yup.string().required('Occupation is required'),
        // loanproduct:Yup.string().required('Please choose loan product'),
        loanamount:Yup.string().required('Amount is required'),
   
        loantenature:Yup.string().required('Please input tenature')
    
    })
    const [personal,setPersonal]= useState(true);
    const [product,setProduct] = useState(false);
    const [period,setPeriod] = useState(false);
    const [amount,setAmount] = useState(false)
    const [complete,setComplete] = useState(false)
    const [upload,setUpload] = useState(false)
    const [front,setFront] = useState('');
    const [back,setBack] = useState('');
    const [message,setMessage] = useState('');
    const [loanperiod,setloanPeriod] = useState('')
    const [product2,setProduct2] = useState('')
    const [totalinterest,setTotalInterest] = useState('')

   const [values,setValues] = useState({
            fullname:'',
            phonenumber:'',
            email:'',
            id:'',
            job:'',
            loanproduct:'',
            loanamount:'',
            loantenature:'',
   });
   const {fullname,phonenumber,email,id,job,loanproduct,loanamount,loantenature} = values;
   const onChange = (e)=>{
    setValues({...values, [e.target.name]:e.target.value})
   };

    const handleChangePeriod = (e)=>{
        setloanPeriod(e.target.value)
    
    }
    const handleFront=async(e)=>{
        e.preventDefault();
        const files = e.target.files;
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "Images");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/marite/image/upload",
          {
            method:"POST",
            body:data
          }
        )
        const File = await res.json()
        setFront(File.url)
    }
    const handleBack=async(e)=>{
        e.preventDefault();
        const files = e.target.files;
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "Images");
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/marite/image/upload",
          {
            method:"POST",
            body:data
          }
        )
        const File = await res.json()
        setBack(File.url)
    }
    const handlePersonal = ()=>{
        setPersonal(false);
        setUpload(true)
    }
    const handlePersonal2 = ()=>{
        setPersonal(true);
        setUpload(false)
    }
    const handleUpload = ()=>{
        if(!front || !back){
         setMessage('ID Photos are required')
        }else{
            setMessage('')
        }
        setTimeout(()=>{
            setUpload(false)
            setProduct(true)
        },1000)
    }
    const handleUpload2 = ()=>{
        setUpload(true)
        setProduct(false)
    }
    const handleProduct = ()=>{
        setAmount(true);
        setProduct(false)
    }
    const handleProduct2 = ()=>{
        setProduct(true);
        setAmount(false)
    }
    const handleAmount = () =>{
        setAmount(false)
        setPeriod(true)
    }
    const handleAmount2 = ()=>{
        // setValues({...values, loantenature:''})
        // console.log(loantenature)
        setAmount(true);
        setPeriod(false)
    }
    const handlePeriod = ()=>{
        let products = data.filter(function (product) {
            return product.name == loanproduct;
        })
        setProduct2(products[0].interest);
        if(loanperiod === 'Months'){
            console.log(loanamount)
         setTotalInterest(loanamount* products[0].interest/100 *loantenature)    
        }else if(loanperiod === 'Weeks'){
        setTotalInterest(loanamount* products[0].interest/100 *loantenature/4)   
        }else if(loanperiod === 'Days'){
            setTotalInterest(loanamount* products[0].interest/100 *loantenature/30)     
        }else if(loanperiod === 'Years'){
            setTotalInterest(loanamount* products[0].interest/100 *loantenature*12) 
        }
        setPeriod(false);
        setComplete(true)
    }
    const handlePeriod2 = ()=>{
      
        setPeriod(true);
        setComplete(false)
    }
   
    const handleComplete = async()=>{
        const finalAmount = Number(totalinterest) + parseInt(loanamount);
        dispatch(newLoan({
                fullname:fullname,
                phonenumber:Number(phonenumber),
                email:email,
                idnumber:Number(id),
                job:values.job,
                product:loanproduct,
                amount:Number(loanamount),
                period:loanperiod,
                tenature:Number(values.loantenature),
                front:front,
                back:back,
                rate:Number(product2),
                interest:totalinterest,
                finalAmount:finalAmount,
                balance:finalAmount
        })).then((response)=>{
               if(response.payload.success){
                setTimeout(()=>{
                    navigate('/loans')
                },3000)
               }
        })
    }
   useEffect(()=>{
    dispatch(getProducts());
   },[])
    return(
    <DashboardWrapper>
        <Toast/>
     <div className=" items-center justify-center py-2 pl-1 pr-3  md:ml-20 lg:ml-5  ">
  
            {personal &&   <div>
            <p>Personal Information</p>
            <Input
             name='fullname'
             type='text'
             value={fullname}
             handleChange={onChange}
             placeholder='Full Name'
             icon={<MdOutlinePersonPin/>}/>
            <Input
             name='email'
             type='text'
             value={email}
             handleChange={onChange}
             placeholder='email'
             icon={<TfiEmail/>}
             />
            <Input
             name='phonenumber'
             type='text'
             value={phonenumber}
             handleChange={onChange}
             placeholder='phonenumber'
             icon={<FcPhone/>}/>
             <Input
             name='id'
             type='text'
             value={id}
             handleChange={onChange}
             placeholder='ID Number'
             icon={<TiBusinessCard/>}/>
            <Input
            name='job'
            type='text'
            value={job}
            handleChange={onChange}
            placeholder='Occupation'
             icon={<FcBriefcase />}
             />
           
           
            <div onClick={handlePersonal} className="flex float-right mt-5">
            <p className="-mt-1">Next</p>
            <FcNext className="text-lg "/>
            </div>
        </div> }
        {upload && <>
        {message && <div className="text-center text-red-600">{message}</div>}
            <div className="w-full flex space-x-6">
            <div className="w-3/5">
            <p>Upload Front ID Image</p>
            <Input
            name='front'
            handleChange={handleFront}
            // error={touched.front && errors.front}
            type='file'/>
            </div>
            <div className="w-2/5 h-26">
                <img src={front} alt='' className="h-full w-full"/>
            </div>
            </div>
            <div className="w-full flex space-x-6 mt-5">
            <div className="w-3/5">
            <p>Upload Back ID Image</p>
            <Input 
            type='file'
            name='back'
            handleChange={handleBack}
            />
            </div>
            <div className="w-2/5 h-26">
            <img src={back} alt='' className="h-full w-full"/>
            </div>
            </div>
            <div className="flex justify-between space-x-48">
            <div onClick={handlePersonal2} className="flex mt-5">
            <FcPrevious className="text-lg "/>
            <p className="-mt-1">Back</p>
            </div>
            <div onClick={handleUpload} className="flex mt-5">
            <p className="-mt-1">Next</p>
            <FcNext className="text-lg "/>
            </div>
            </div> 
            </> }
        {product && <div>
            <p>Product Information</p>  
            <select 
            id="loanproduct"
            name="loanproduct" 
            value={loanproduct}
            onChange={onChange}
            className="w-full rounded-md appearance-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            >
            <option value = ''>Select Loan Product</option>
            {data.map((u,key)=>{
                return<option key={key} value={u.name}>{u.name} - {u.interest}% p.m</option>

            })}
            </select> 
            <div className="flex justify-between space-x-48">
            <div onClick={handleUpload2} className="flex mt-5">
            <FcPrevious className="text-lg "/>
            <p className="-mt-1">Back</p>
            </div>
            <div onClick={handleProduct} className="flex mt-5">
            <p className="-mt-1">Next</p>
            <FcNext className="text-lg "/>
            </div>
            </div> 
          
        </div>}
        {amount && 
        <div>
         <p>Amount</p>
         <Input
        name='loanamount'
        type='text'
        value={loanamount}
        handleChange={onChange}
        placeholder='Amount'
        icon={<GiReceiveMoney/>}/>  
        <div className="flex justify-between space-x-48">
        <div onClick={handleProduct2} className="flex mt-5">
        <FcPrevious className="text-lg "/>
        <p className="-mt-1">Back</p>
        </div>
        <div onClick={handleAmount} className="flex mt-5">
        <p className="-mt-1">Next</p>
        <FcNext className="text-lg "/>
        </div>
        </div> 
        </div>}
        {period && <div>
            <p>Loan Period </p>  
            <div className="grid grid-cols-2 space-x-2">
            <Input
             name='loantenature'
             type='text'
             value={loantenature}
             handleChange={onChange}
            placeholder='e.g 3'
            icon={<CgSandClock/>}
            /> 

            <select
            value={loanperiod}
            name='loanperiod'
            onChange={handleChangePeriod}
            className="h-14 mt-5  rounded-md appearance-none relative block w-full  px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
             <option value="">Choose period unit</option>
            <option value="Years">Years</option>
            <option value="Months">Months</option>
            <option value="Weeks">Weeks</option>
            <option value="Days">Days</option>
            </select> 

            </div>
              
            <div className="flex justify-between space-x-48">
            <div onClick={handleAmount2} className="flex mt-5">
            <FcPrevious className="text-lg "/>
            <p className="-mt-1">Back</p>
            </div>
            <div onClick={handlePeriod} className="flex mt-5">
            <p className="-mt-1">Next</p>
            <FcNext className="text-lg "/>
            </div>
            </div> 
        </div>}
      
        {complete && <div>
            <i>Preview</i> 
            <div className="w-5/5 h-4/5   py-2 bg-white-100 space-y-4 ">
            <p className="text-blue-500 font-bold">Personal Information</p>
            <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 ">
            <Details detail={fullname} icon={<MdOutlinePersonPin/>}/>
            <Details detail={email} icon={<TfiEmail/>}/>
            <Details detail={phonenumber} icon={<FcPhone/>}/>
            <Details detail={id} icon={<TiBusinessCard/>}/>
            <Details detail={job} icon={<FcBriefcase />}/>
            </div>
             <p  className="text-blue-500 font-bold">Loan details</p>
                <div className="grid grid-cols-3">
                    <div className="mb-2">
                    <p className="text-sm font-bold">{" Loan Product"}</p>
                <Details detail={loanproduct} icon={<FcPackage/>}/>
                    </div>
             <div >
             <p className="text-sm font-bold">{"Principal"}</p>
                <Details detail={loanamount} icon={<GiReceiveMoney/>}/>
             </div>
              <div>
              <p className="text-sm font-bold">{" Period"}</p>
               <Details detail={loantenature+loanperiod} icon={<CgSandClock/>}/>
              </div>
              
                </div>
                <p  className="text-blue-500 font-bold">Uploads</p>
                <div  className="grid grid-cols-2  w-full space-x-1  ">
                <div className="w-4/5 h-40">
                <img src={front} alt='' className="h-full w-full"/>
               </div>
               <div className="w-4/5 h-40">
                <img src={back} alt='' className="h-full w-full"/>
               </div>
                </div>
            </div> 
            <div className="flex justify-between space-x-46">
            <div onClick={handlePeriod2} className="flex mt-5">
            <FcPrevious className="text-lg "/>
            <p className="-mt-1">Back</p>
            </div>
            <div  className="flex mt-5">
            <button type="submit" onClick={handleComplete} className="bg-green-500 rounded-md hover:bg-black hover:text-white h-10 w-14">Apply</button>
            </div>
            </div> 
        </div>}
     
        
  
        </div>
    </DashboardWrapper>
    )
}

export default ApplyLoan;