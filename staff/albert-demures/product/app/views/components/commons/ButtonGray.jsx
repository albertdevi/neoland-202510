export function ButtonGray({ children, type, className, onClick, id, ...props}){
    return <button id={id} className={`w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end ${className}`}
    type={type} onClick={onClick} {...props}>{children} </button>
}