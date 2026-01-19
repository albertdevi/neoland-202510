function Label ({alias, children}){
    return <label htmlFor={alias} className="text-m font-bold text-gray-600 mt-2">{children}</label>
}