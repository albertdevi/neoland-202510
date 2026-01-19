function InputText({ type, className = '', id, name, autoComplete }) {
    return (
        <input id={id} type={type} name={name} autoComplete={autoComplete} className={`
                border border-gray-300 rounded-lg px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition}
                ${className}`}
        />)
}