export default function Button({title,onClick,disabled}){
    return(
    <>
      <button disabled={disabled} type="submit" onClick={onClick} className="mt-10 justify-center text-base relative w-full py-2 px-2 bg-green-600 hover:bg-black  disabled:bg-slate-50 text-white border border-transparent">{title}</button>
    </>  
    )
}