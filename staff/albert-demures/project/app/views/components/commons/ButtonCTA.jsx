export function ButtonCTA ({ children, type, className, onClick, id, ... props}){
    return <button id={id} className={`bg-[#FF7621] text-white font-semibold py-2 px-8 rounded-lg  shadow-lg hover:bg-[#FF6200] transition-colors duration-200 self-center w-full ${className}`}
    type= {type} onClick={onClick} {...props}>{children}</button>
}