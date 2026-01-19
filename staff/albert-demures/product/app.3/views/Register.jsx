const {useState} = React

function Register({ onGoToLogin }) {
    console.log('Register -> call')

    const [message, setMessage] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [passwordRepeatType, setPasswordRepeatType] = useState('password')

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(name, email, username, password, passwordRepeat)

            form.reset()

            setMessage('')
            setPasswordType('password')
            setPasswordRepeatType('password')

            onGoToLogin()
        } catch (error) {
            setMessage(error.message)
        }
    }

    const handleTogglePasswordClick = event => {
        event.preventDefault()

        setPasswordType(passwordType === 'password' ? 'text' : 'password')
    }

    const handleTogglePasswordRepeatClick = event => {
        event.preventDefault()

        setPasswordRepeatType(passwordRepeatType === 'password' ? 'text' : 'password')
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
    }

    console.log('Register -> render')

    return <div className="flex flex-col items-center justify-center min-h-screen">

           <Title></Title>

            <SubTitle>Register</SubTitle>

            <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit={handleRegisterSubmit}>
                <label className="text-m text-gray-600 mt-2" htmlFor="name">Name</label>
                <InputText
                    id="name" name="name" autoComplete="name" type="text" />

                <label className="text-m text-gray-600 mt-2" htmlFor="email">Email</label>
                <InputText
                    id="email" name="email" autoComplete="email" type="email" />

                <label className="text-m text-gray-600 mt-2">Username</label>
                <InputText 
                    id="username" name="username" autoComplete="username" type="text" />

                <label className="text-m text-gray-600 mt-2" htmlFor='password'>Password</label>
                <InputPassword
                    id="password" name="password" autoComplete="off" type={passwordType} />

                <ButtonGray className="" type="button" onClick={handleTogglePasswordClick}>{passwordType === 'password' ? 'show' : 'Hide'}</ButtonGray>

                <label className="text-m text-gray-600 mt-2" htmlFor="passwordRepeat">Repeat Password</label>
                <InputPassword
                    id="passwordRepeat" name="passwordRepeat" autoComplete="off" type={passwordRepeatType} />

                <ButtonGray className="" type="button" onClick={handleTogglePasswordRepeatClick}>{passwordRepeatType === 'password' ? 'show' : 'Hide'}</ButtonGray>

                <button className="bg-blue-600 text-white font-semibold py-2 px-16 rounded-lg shadow hover:bg-blue-700 transition-colors duration-200 self-center" type="submit">Register</button>
            </form>

            <a href="" className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a>

            <p className="text-red-600 text-sm mt-2 font-medium">{message}</p>

        </div>
}