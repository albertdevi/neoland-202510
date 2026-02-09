export function InputText({ type, className = '', alias, autoComplete}) {
    return (
        <input id={alias} type={type} name={alias} autoComplete={autoComplete || alias} className={`
                border border-gray-300 rounded-lg px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition}
                ${className}`}
        />)
}