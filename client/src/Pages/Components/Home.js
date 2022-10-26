import { useNavigate } from "react-router-dom"
export default function Home(){
    const navigate = useNavigate()
    return(
    <>
          <div className="min-h-screen w-full space-y-4 bg-hero bg-left bg-cover">
            <div className="pt-4 space-y-4">
            <div className="flex space-x-4 items-center justify-center">
            <div onClick={()=>navigate('/apply')} className="h-56 w-2/6 bg-transparent font-bold text-lg py:10 shadow-lg pt-20 hover:bg-blue-500 shadow-green-700 text-center items-center justify-center border-2 border-green-600">
            Apply for Loan
            </div>
            <div className="h-56 w-2/6 bg-transparent font-bold text-lg py:10 shadow-lg pt-20 hover:bg-blue-500 shadow-green-700 text-center items-center justify-center border-2 border-green-600">
            Make Payment
            </div>
            </div>
            <div className="flex space-x-4 items-center justify-center ">
            <div className="h-56 w-2/6 bg-transparent font-bold text-lg py:10 shadow-lg pt-20 hover:bg-blue-500 shadow-green-700 text-center items-center justify-center border-2 border-green-600">
            My Transactions
            </div>
            <div className="h-56 w-2/6 bg-transparent font-bold text-lg py:10 shadow-lg pt-20 hover:bg-blue-500 shadow-green-700 text-center items-center justify-center border-2 border-green-600">
            Queries
            </div>
            </div>
            </div>
            </div>
    </>
    )
}