const AuthWrapper = ({children})=>{
    return(
        <div className="h-full min-h-screen flex items-center justify-center py-2 px-4 sm:px-6 lg:px:8 font-cursive bg5">
        <div className="max-w-md w-full space-y-3">
            {children}
        </div>
        </div>
    )
}
export default AuthWrapper;