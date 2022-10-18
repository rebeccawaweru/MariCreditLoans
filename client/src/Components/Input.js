const fixedInputClass = "rounded-md appearance-none relative block w-full  px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
export default function Input({
    onBlur,
    handleChange,
    value,
    labelText,
    labelFor,
    id,
    name,
    type,
    placeholder,
    customClass,
    error
}){
    return(
        <div className="my-5">
        <label htmlFor={labelFor} className="sr-only">{labelText}</label>
        <input
        onBlur={onBlur}
        onChange={handleChange}
        value={value}
        id={id}
        name={name}
        required
        type={type}
        placeholder={placeholder}
        className={fixedInputClass+customClass}
        />
        {error ? <div className="text-center text-red-600 text-sm py-2">
                {error}
        </div> : null }
        </div>
    )
}