export function Select({ alias, className, defaultValue, children }) {
    return <select id={alias} name={alias} defaultValue={defaultValue} className={`
                bg-white border-3 border-[#82C9E3] rounded-lg px-3 py-2 shadow-sm
                focus:outline-none focus:ring-1 focus:ring-blue-500
                focus:border-blue-500 transition ${className}`} children={children} />
}