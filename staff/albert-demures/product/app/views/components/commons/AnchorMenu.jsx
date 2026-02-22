export function AnchorMenu({ children, className, onClick,}){
    return <a className={`px-1 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:border-b-2 hover:border-blue-600 transition ${className}`} href="" 
     onClick={onClick}>{children}</a>
}