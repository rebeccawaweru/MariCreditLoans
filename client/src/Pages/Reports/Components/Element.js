const Element = ({data,title,style,style2})=>{
    return(
        <div style={style} className="mx-2 h-36 w-28 bg-white hover:bg-green-300 border border-gray-300 text-center justify-center items-center p-4 relative shadow-2xl shadow-indigo-500">
            <p className="text-xs font-bold">{title}</p>
        <div style={style2} className="text-center justify-center items-center rounded-full h-8 w-8 text-white  -bottom-2 -right-2 absolute">
            <p className="text-center justify-center items-center mt-1 ">{data}</p>
        </div>
        </div>
      
    )
};

export default Element;