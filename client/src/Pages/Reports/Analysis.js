import { DashboardWrapper } from "../../Components";
import Element from "./Components/Element";
import { useDispatch } from "react-redux";
import { getLoans } from "../../redux/loanSlice";
import { useEffect, useState } from "react";
import { getPayments } from "../../redux/paymentSlice";
import { getProducts } from "../../redux/productSlice";
import { Chart } from "react-google-charts";

export default function Analysis(){
   
   const [data,setData] = useState('')
   const [rejected,setRejected] = useState('')
   const [pending,setPending] = useState('')
   const [loan,setLoan] = useState(0)
   const [payment,setPayment] = useState(0)
   const [products,setProducts] = useState([])
   const [pie,setPie] = useState('');
   const [pie2,setPie2] = useState(0);
   const dispatch = useDispatch();
   useEffect(()=>{
    dispatch(getProducts()).then((response)=>{
          setProducts(response.payload)
    })
    dispatch(getPayments()).then((response)=>{
        let total = 0;
        response.payload.map(course => total+=course.amount)
        setPayment(total)
    })
     dispatch(getLoans()).then((response)=>{
       setData(response.payload.filter(function(item){
        return (item.request === 'Approved')
       }));
       setRejected(response.payload.filter(function(item){
        return (item.request === 'Rejected')
       }));
       setPending(response.payload.filter(function(item){
        return (item.request === 'Pending')
       }));
       let total = 0
     response.payload.map(course => total+=course.amount)
     setLoan(total)
      })

      if(payment && loan){
        setPie([
            ["Task", "Hours per Day"],
            ["Total Payments",payment],
            ["Total Loans", loan],
           
          ]);
      } 
      if(data && rejected && pending){
        setPie2([
            ["Task", "Hours per Day"],
            ["Approved Loans",data.length],
            ["Rejected Loans", rejected.length],
            ["Pending",pending.length] 
        ]);
      }
     
     
   },[data, dispatch, loan, payment, pending, rejected])


  const options = {
    title: "Analysis",
    is3D: true,
    backgroundColor:'transparent',
  };
    return(
   <DashboardWrapper>
     <div className="mt-4 flex justify-center items-center text-center p-4">
    <Chart
    chartType="PieChart"
       data={pie}
       options={options}
       width="80%"
       height="200px"
 
    /> 
    <Chart
    chartType="PieChart"
    data={pie2}
    options={options}
    width="80%"
    height="200px"
 
    /> 
    </div>
            <div className="mt-4 flex justify-center items-center text-center">
            <Element style={{border:'1px solid green'}} style2={{backgroundColor:'green'}} title='Products' data={products.length} />
            <Element style={{border:'1px solid green'}} style2={{backgroundColor:'green'}} title='Mobile Users' data={products.length} />
            <Element style={{border:'1px solid green'}} style2={{backgroundColor:'green'}} title='Approved Loans' data={data.length} />
            <Element style={{border:'1px solid gray '}} style2={{backgroundColor:'gray'}}  title='Pending Loans' data={pending.length} />
            <Element style={{border:'1px solid red '}} style2={{backgroundColor:'red'}}  title='Rejected Loans' data={rejected.length} />
            
            <Element style={{border:'1px solid red '}}  title={`Total Principal:Ksh ${loan.toLocaleString()}`}  />
            <Element style={{border:'1px solid green '}}  title={`Total Payment:Ksh ${payment.toLocaleString()}`}  />
            </div>

           

         
        </DashboardWrapper>
    )
}