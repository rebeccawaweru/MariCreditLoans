import {TfiEmail} from 'react-icons/tfi'
import { TextField, InputAdornment  } from '@mui/material'
const fixedInputClass = "rounded-md appearance-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
export default function Input({
    label,
    onBlur,
    handleChange,
    value,
    id,
    name,
    type,
    placeholder,
    customClass,
    error,
    icon
}){
    return(
        <div className="my-5 ">
        <TextField
        onBlur={onBlur}
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        required
        type={type}
        placeholder={placeholder}
        label={label}
        className={fixedInputClass+customClass}
        InputProps={{
            startAdornment: <InputAdornment position="start" ><div className='text-xl text-green-600'>{icon}</div></InputAdornment>,
          }}
        />
            
    
        {error ? <div className="text-center text-red-600 text-sm py-2">
                {error}
        </div> : null }
        </div>
    )
}