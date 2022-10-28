import { Button, DashboardWrapper,Input,Toast } from "../Components";
import { FcNext,FcPrevious,FcClock,FcMoneyTransfer,FcBriefcase,FcPackage,FcPhone,FcStatistics } from "react-icons/fc";
import {TiBusinessCard} from "react-icons/ti"
import {TfiEmail} from 'react-icons/tfi'
import {MdOutlinePersonPin} from 'react-icons/md'
import {CgSandClock} from 'react-icons/cg'
import {CiPercent} from 'react-icons/ci'
import {GiReceiveMoney} from 'react-icons/gi'
import { useEffect, useState } from "react";
import { Formik } from "formik";
import * as Yup from 'yup';
import { Details } from "./Components";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const regx = /^\d{10}$/;

const ApplyLoan = ()=>{
    const navigate = useNavigate()
    const validationSchema = Yup.object({
        fullname:Yup.string().required('Kindly enter fullname as it appears in your ID').trim().min(6,'Kindly enter fullname as it appears in your ID' ),
        email:Yup.string().email('Invalid Email').required('Email is required'),
        phonenumber:Yup.string().matches(regx,'Invalid phonenumber').required('Phone Number is required'),
        id:Yup.string().required('ID Number is required').matches(/^[0-9]+$/, "Must be only digits").trim().min(8,'ID must have 8 digits').trim().max(8, 'ID must have 8 digits'),
        job:Yup.string().required('Occupation is required'),
        // loanproduct:Yup.string().required('Please choose loan product'),
        loanamount:Yup.string().required('Amount is required'),
        loanperiod:Yup.string().required('Please choose period'),
        loantenature:Yup.string().required('Please input tenature')
    
    })
    const [personal,setPersonal]= useState(true);
    const [product,setProduct] = useState(false);
    const [period,setPeriod] = useState(false);
    const [amount,setAmount] = useState(false)
    const [complete,setComplete] = useState(false)
    const [upload,setUpload] = useState(false)
    const [front,setFront] = useState('');
    const [back,setBack] = useState('')
    const [message,setMessage] = useState('')
    const [data,setData] = useState([])
    const [totalinterest,setTotalInterest] = useState('')
    
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
        setAmount(true);
        setPeriod(false)
    }
    const handlePeriod = ()=>{

        setPeriod(false);
        setComplete(true)
    }
    const handlePeriod2 = ()=>{
        setPeriod(true);
        setComplete(false)
    }
   
    const handleComplete = async(values)=>{
     try {
        let products = data.filter(function (product) {
            return product.name == values.loanproduct;
        })
        console.log(products[0].interest)
        if(values.loanperiod === "Months"){
            setTotalInterest(  values.loanamount *products[0].interest/100 *values.loantenature/12)
            
         }else if(values.loanperiod === "Weeks"){
             setTotalInterest( values.loanamount *products[0].interest/100 *values.loantenature/52)    
         }else if(values.loanperiod === "Days"){
             setTotalInterest(  values.loanamount *products[0].interest/100 *values.loantenature/365)
         }else{
             setTotalInterest(  values.loanamount *products[0].interest/100 *values.loantenature)    
               }
    
       
         const finalAmount = Number(totalinterest) + parseInt(values.loanamount)
     
         setTimeout(()=>{
             axios.post('http://localhost:5000/loan',{
                fullname:values.fullname,
                phonenumber:Number(values.phonenumber),
                email:values.email,
                idnumber:Number(values.id),
                job:values.job,
                product:values.loanproduct,
                amount:Number(values.loanamount),
                period:values.loanperiod,
                tenature:Number(values.loantenature),
                front:front,
                back:back,
                rate:products[0].interest,
                interest:totalinterest,
                finalAmount:finalAmount,
            }).then((response)=>{
               if(response.data.success){
                console.log(response.data)
                  toast.success('Loan request sent successfully');
                  setTimeout(()=>{
                    navigate('/dashboard')
                  },3000)
               }
            })  
         },2000)
     } catch (error) {
        console.log(error)
     }
   }
   async function getProducts(){
    await axios.get('http://localhost:5000/product').then((response)=>{
       setData(response.data.product)
    })
  
   }
   useEffect(()=>{
    getProducts();
   },[data])
    return(
    <DashboardWrapper>
        <Toast/>
     <div className=" items-center justify-center py-2 pl-1 pr-3  md:ml-20 lg:ml-5 ">
        <Formik
        initialValues={{
            fullname:'',
            phonenumber:'',
            email:'',
            id:'',
            job:'',
            loanproduct:'',
            loanamount:'',
            loanperiod:'',
            loantenature:'',
        }}
        validationSchema={validationSchema}
        onSubmit={handleComplete}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
         })=>{
            const{fullname,email,phonenumber,id,job,loanproduct,loanamount,loanperiod,loantenature} = values;
            return(
                <>
            {personal &&   <div>
            <p>Personal Information</p>
            <Input
             name='fullname'
             type='text'
             value={fullname}
             handleChange={handleChange('fullname')}
             onBlur={handleBlur('fullname')}
             error={touched.fullname && errors.fullname}
             placeholder='Full Name'
             icon={<MdOutlinePersonPin/>}/>
            <Input
             name='email'
             type='text'
             value={email}
             handleChange={handleChange('email')}
             onBlur={handleBlur('email')}
             error={touched.email && errors.email}
             placeholder='email'
             icon={<TfiEmail/>}
             />
            <Input
             name='phonenumber'
             type='text'
             value={phonenumber}
             handleChange={handleChange('phonenumber')}
             onBlur={handleBlur('phonenumber')}
             error={touched.phonenumber && errors.phonenumber}
             placeholder='phonenumber'
             icon={<FcPhone/>}/>
             <Input
             name='id'
             type='text'
             value={id}
             handleChange={handleChange('id')}
             onBlur={handleBlur('id')}
             error={touched.id && errors.id}
             placeholder='ID Number'
             icon={<TiBusinessCard/>}/>

            <Input
            name='job'
            type='text'
            value={job}
            handleChange={handleChange('job')}
            onBlur={handleBlur('job')}
            error={touched.job && errors.job}
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
            onBlur={handleBlur('loanproduct')}
            onChange={handleChange('loanproduct')}
            
            className="w-full rounded-md appearance-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            >
            <option value = ''>Select Loan Product</option>
            {data.map((u,key)=>{
                return<option key={key} value={u.name}>{u.name} - {u.interest}% p.a</option>

            })}
            </select> 

            {!loanproduct && touched.loanproduct && <div className="text-center text-red-600 text-sm py-2">loan product is required</div>}
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
        handleChange={handleChange('loanamount')}
        onBlur={handleBlur('loanamount')}
        error={touched.loanamount && errors.loanamount}
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
            <select
            value={loanperiod}
            onChange={handleChange('loanperiod')}
            onBlur={handleBlur('loanperiod')}
            name="loanperiod" 
            id="loanperiod" 
            className="w-full mt-2 rounded-md appearance-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
             <option value="">Choose period unit</option>
            <option value="Years">Years</option>
            <option value="Months">Months</option>
            <option value="Weeks">Weeks</option>
            <option value="Days">Days</option>
            </select> 
            {!loanperiod && touched.loanperiod && <div className="text-center text-red-600 text-sm pt-2">Period Unit is required</div>}
            <Input
             name='loantenature'
             type='text'
             value={loantenature}
             handleChange={handleChange('loantenature')}
             onBlur={handleBlur('loantenature')}
             error={touched.loantenature && errors.loantenature}
            placeholder='e.g 3'
            icon={<CgSandClock/>}
            />    
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
             
              {/* <div>
              <p className="text-sm font-bold">{" Interest Rate"}</p>
                <Details detail='3% p.a' icon={<CiPercent/>}/>
              </div>
               <div>
               <p className="text-sm font-bold">{" Principal"}</p>
                <Details detail='550' icon={<FcStatistics/>}/>
               </div> */}
              {/* <div className="mb-2">
              <p className="text-sm font-bold">{" Total"}</p>
                <Details detail='Total' icon={<FcMoneyTransfer/>}/>
              </div>
              <div>
              <p className="text-sm font-bold">{"Due Date"}</p>
                <Details detail='Due Date' icon={<FcClock/>}/>
              </div> */}
              
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
            <button type="submit" onClick={handleSubmit} className="bg-green-500 rounded-md hover:bg-black hover:text-white h-10 w-14">Apply</button>
            </div>
            </div> 
        </div>}
     
                </>
            )}}
       
        </Formik>
  
        </div>
    </DashboardWrapper>
    )
}

export default ApplyLoan;