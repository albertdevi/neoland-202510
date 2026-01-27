const { useState } = React

function PasswordField({ alias, children }) {
    const [type, setType] = useState('password')

    const handleTooglePasswordClick = event => {
        event.preventDefault()

        setType(type === 'password' ? 'text' : 'password')
    }

    return <div className='flex flex-col gap-4'>
        <Label alias={alias}>{children}</Label>
        <Input alias={alias} type={type} autoComplete="off" className={type === 'password' ? '' : 'bg-yellow-100'} />
        <button className="w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end" type="button" onClick={handleTooglePasswordClick}>{type === 'password' ? 'Show' : 'Hide'}
        </button>
    </div>
}