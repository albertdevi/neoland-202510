const {useState} = React

function Login({onGoToHome, onGoToRegister}) {
    console.log('Login -> call')

    const [message, setMessage] = useState('')
    const [passwordType, setPasswordType] = useState('password')

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        try {
            logic.loginUser(username, password)

            form.reset()

            setMessage('')
            setPasswordType('password')

            onGoToHome()
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    const handleRegisterClick = event => {
        event.preventDefault()

        onGoToRegister()
    }


    console.log('Login -> render')

    return <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-5xl font-extrabold text-blue-600 text-center mt-6 tracking-tight">MyPet</h1>

        <h2 className="text-3xl font-semibold text-blue-500 text-center mt-4 tracking-tight">Login</h2>

        <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit={handleLoginSubmit}>
            <label className="text-m text-gray-600 mt-2" htmlFor="username">Username</label>
            <input className="border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition" id="username" name="username" autoComplete="username" type="text" />

            <label className="text-m text-gray-600 mt-2" htmlFor="password">Password</label>
            <input className={'border border-gray-300 rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition' + (passwordType === 'password' ? ' bg-white-100' : ' bg-yellow-100')} id="password" name="password" autoComplete="password" type={passwordType} />

            <button className="w-24 bg-gray-600 text-white font-semibold py-1 px-0 rounded-lg shadow hover:bg-gray-700 transition-colors duration-200 self-end" type="button" onClick={handleTogglePasswordClick} > {passwordType === 'password' ? 'Show' : 'Hide'}</button>

            <button className="bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" >Login</button>
        </form>

        <a className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>

        <p className="text-red-600 text-sm mt-2 font-medium"> {message} </p>
    </div>
}