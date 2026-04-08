export function InputText({ alias, autoComplete, type, className, defaultValue, step}) {
    return <input id={alias} name={alias} autoComplete={autoComplete || alias} type={type} className={`
                  border border-gray-300 rounded-lg px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition
                ${className}`} defaultValue= {defaultValue} step={step} />
}