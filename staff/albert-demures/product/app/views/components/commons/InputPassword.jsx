export function InputPassword({ type, className = '', alias}) {
    return (
        <input id={alias} type={type} name={alias} autoComplete={alias} className={`
                border border-gray-300 rounded-lg px-3 py-2 shadow-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500
                focus:border-blue-500 transition
                ${type === 'password' ? 'bg-white-100' : 'bg-yellow-100'}
                ${className}`}
        />)
}