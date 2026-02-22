export function ButtonBlue({ children, type, className, onClick, id, ...props}){
    return <button id={id} className={`bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center ${className}`}
    type={type} onClick={onClick} {...props}>{children}</button>
}