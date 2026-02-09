export function Anchor({ children, className, onClick,}){
    return <a className={`cursor-pointer underline font-bold ${className}`} href="" 
     onClick={onClick}>{children}</a>
}