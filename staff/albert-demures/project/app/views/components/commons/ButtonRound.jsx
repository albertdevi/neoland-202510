export function ButtonRound ({ children, type, className, onClick, id, ... props}) {
    return <button id={id} className={`text-white font-semibold py-2 px-2 rounded-full  shadow-lg hover:bg-[#FF6200] transition-colors duration-200 self-center w-9 h-9 flex items-center justify-center ${className}`}
    type= {type} onClick={onClick} {...props}>{children}</button>
}