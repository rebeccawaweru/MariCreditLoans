import { DashboardWrapper,Input, Toast,CustomModal } from "../../Components";
import { Button } from "@mui/material";
import { useDispatch,useSelector } from "react-redux";
import { updateLoan,getLoan } from "../../redux/loanSlice";
import { getProducts } from "../../redux/productSlice";
import { useEffect, useState } from "react";
import {TiBusinessCard} from "react-icons/ti"
import {TfiEmail} from 'react-icons/tfi'
import {MdOutlinePersonPin} from 'react-icons/md'
import {CgSandClock} from 'react-icons/cg'
import {GiReceiveMoney} from 'react-icons/gi'
import {FcBriefcase,FcPhone,} from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function UpdateLoan(){
    const {data} = useSelector(state=>state.product)
    const {fullname,email,phonenumber,idnumber,job,product,amount,tenature,period,request,front,back,rate,interest,finalAmount} = useSelector(state=>state.loan.loanInfo)
    const [userFront,setuserFront] = useState('')
    const [userBack,setuserBack] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [totalinterest,setTotalInterest] = useState('');
    const [initialdate,setinitialDate] = useState('')
    const [duedate,setdueDate] = useState('');
    const [days,setDays] = useState(0)
    const [open,setOpen] = useState(false)
    const [a,setA] = useState('')
    const [pr,setPr] = useState(0)
    const [loading,setLoading] = useState(true)
    const [loading2,setLoading2] = useState(true)
    const [values,setValues] = useState({
        userfullname:'',
        useremail:'',
        userphonenumber:'',
        useridnumber:'',
        userjob:'',
        userproduct:'',
        useramount:'',
        usertenature:'',
        userperiod:'',
        userequest:'',
    });
    const {userfullname,useremail,userphonenumber,useridnumber,userjob,userproduct,useramount,usertenature,userperiod,userequest} = values;
    const onChange = (e)=>{
        setValues({...values, [e.target.name]:e.target.value})
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
        setuserFront(File.url)
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
        setuserBack(File.url)
    }
    const handleSubmit =async()=>{
        setA(values.useramount || amount) ;
        const b =  values.useramount || amount
        const p = values.userproduct || product
            let products = data.filter(function (product) {
                return product.name == p;
            })
        const n = values.userperiod || period
        const t = values.usertenature || tenature
        if(n  === "Months"){
            setTotalInterest(parseInt(b)*products[0].interest/100*t)    
             setDays(t*30)
             setLoading(false)
         }else if(n  === "Weeks"){
            setTotalInterest(parseInt(b)*products[0].interest/100 *t/4)  
            setDays(t*7)     
            setLoading(false) 
         }else if(n  === "Days"){
            setTotalInterest(parseInt(b)*products[0].interest/100 *t/30)
            setDays(t*1)  
            setLoading(false)  
         }else if(n  === "Years"){
             setTotalInterest(parseInt(b)*products[0].interest/100*t*12) 
             setDays(t*365)   
             setLoading(false)    
        }
        setPr(products[0].interest)
        setOpen(true)   
           
    }

    const handleConfirm = async(e)=>{
    e.preventDefault();
        const userfinalAmount = Number(totalinterest) + parseInt(a)
        console.log(userfinalAmount)
           dispatch(updateLoan({
             fullname:userfullname|| fullname,
             email:useremail || email,
             phonenumber:Number(userphonenumber) || phonenumber,
             idnumber:Number(useridnumber) || idnumber,
             job:userjob || job,
             product:userproduct || product,
             rate:pr || rate,
             interest:totalinterest || interest,
             finalAmount:userfinalAmount,
             balance:userfinalAmount || finalAmount,
             amount:Number(useramount) || amount,
             tenature:Number(usertenature) || tenature,
             period:userperiod || period,
             request:userequest || request,
             front:userFront || front,
             back:userBack || back ,
             due:duedate,
             initiation:initialdate
           })).then((response)=>{
               if(response.payload.success){
                   setTimeout(()=>{
                      navigate('/loans')
                   },2000)
               }
           });
        }
    useEffect(()=>{
        dispatch(getLoan());
        dispatch(getProducts());
        if(days !== 0 && values.userequest === "Approved"  ){
            var date = new Date();
            date.setDate(date.getDate() + days);
            setinitialDate(date.setDate(date.getDate()))
            var date2 = new Date(date),
            mnth = ("0" + (date2.getMonth() + 1)).slice(-2),
            day = ("0" + date2.getDate()).slice(-2);
             setdueDate([date.getFullYear(), mnth, day].join("-")) 
           console.log(duedate)
           console.log(days)
            setinitialDate(new Date().toISOString().slice(0, 10)) ;
          
        }else if(days !== 0 && values.userequest === "Rejected" || values.userequest === "Pending" ){
            setdueDate('-');
            setinitialDate('-')
     
        }else if(days !== 0 && request === "Approved"){
           toast.error('Cannot update Approved Loan')
        }else if(!loading && request === "Rejected" || request === "Pending"){
            setdueDate('-');
            setinitialDate('-')
         
        }
    },[])
    return(
        <DashboardWrapper>
            <Toast/>
        <p>Personal Information</p>
        <CustomModal subject='update loan' handleDelete={handleConfirm} open={open} handleClose={()=>navigate('/loans')} title='Yes' color='success'/>
        <div className="grid grid-cols-2 space-x-2">
        <Input name='userfullname' value={userfullname} handleChange={onChange} label='Full Name'  placeholder={fullname} icon={<MdOutlinePersonPin/>} />
        <Input name='useremail' value={useremail} handleChange={onChange}  label='Email' placeholder={email}  icon={<TfiEmail/>}/>
        </div>
        <div className="grid grid-cols-3 space-x-2">
        <Input name='userphonenumber' value={userphonenumber} handleChange={onChange} label='Phone' placeholder={String(phonenumber)} icon={<FcPhone/>}/>
        <Input name='useridnumber' value={useridnumber} handleChange={onChange} label='ID' placeholder={String(idnumber)} icon={<TiBusinessCard/>}/>
        <Input name='userjob' value={userjob} handleChange={onChange} label='Occupation' placeholder={job}  icon={<FcBriefcase />}/>
        </div>
        <p>Product Information</p>
        <div className='grid grid-cols-2 space-x-2'>
        <select 
            id="loanproduct"
            name="userproduct" 
            value={userproduct}
            onChange={onChange}
            className="h-14 mt-5  rounded-md appearance-none relative block w-full  px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            >
            <option value = {product}>{product}</option>
            {data.map((u,key)=>{
                return<option key={key} value={u.name}>{u.name} - {u.interest}% p.a</option>

            })}
            </select> 
        <Input name='useramount' value={useramount} handleChange={onChange} label='Amount' placeholder={String(amount)} icon={<GiReceiveMoney/>}/> 
        </div>
        <p>Duration</p>
        <div className='grid grid-cols-2 space-x-2'>
        <Input name='usertenature' value={usertenature} handleChange={onChange} placeholder={String(tenature)}  icon={<CgSandClock/>} />
        <select
            name='userperiod'
            value={userperiod}
            onChange={onChange}
            className="h-14 mt-5  rounded-md appearance-none relative block w-full  px-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
             <option value={period}>{period}</option>
            <option value="Years">Years</option>
            <option value="Months">Months</option>
            <option value="Weeks">Weeks</option>
            <option value="Days">Days</option>
            </select> 
        </div>
        <p>Status</p>
        <select
             name='userequest'
             value={userequest}
             onChange={onChange}
            className="w-full mt-2 mb-2 rounded-md appearance-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm">
             <option value={request}>{request}</option>
            <option value="Approved">Approve</option>
            <option value="Rejected">Reject</option>
            <option value="Pending">Pending</option>
            </select> 
         
        <p>Uploads</p>
        <div  className="grid grid-cols-2  w-full space-x-1   ">
        <div className="w-4/5 h-70">
        <img src={front} alt='' className="h-50 w-full"/>
        <Input type='file' handleChange={handleFront}/>
        </div>
        <div className="w-4/5 h-70">
        <img src={back} alt='' className="h-50 w-full"/>
        <Input type='file' handleChange={handleBack}/>
        </div>
        </div>
        <div className='flex justify-between'>
            <Button variant="contained" color="primary" onClick={()=>navigate('/loans')}>Back</Button>
            <Button variant="contained" color="success" onClick={handleSubmit}>Update</Button>
          </div>
        </DashboardWrapper>
    )
}