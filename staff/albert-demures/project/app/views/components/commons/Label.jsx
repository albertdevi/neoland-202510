export function Label ({alias, children}){
    return <label htmlFor={alias} className="text-m font-bold text-[#D5EDF6] mt-2 mb-1"> {children}</label>
}