const { useState } = React

function Login({ onGoToHome, onGoToRegister }) {
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
        <Title></Title>

        <SubTitle>Login</SubTitle>

        <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit={handleLoginSubmit}>
            <label className="text-m text-gray-600 mt-2" htmlFor="username">Username</label>
            <InputText  id="username" name="username" autoComplete="username" type="text" />

            <label className="text-m text-gray-600 mt-2" htmlFor="password">Password</label>

            <InputPassword id="password" name="password" autoComplete="password" type={passwordType} />

            <ButtonGray className="" type="button" onClick={handleTogglePasswordClick}> {passwordType === 'password' ? 'Show' : 'Hide'}</ButtonGray>

            <ButtonBlue className="" type="submit" >Login</ButtonBlue>
        </form>

        <a className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>

        <p className="text-red-600 text-sm mt-2 font-medium"> {message} </p>
    </div>
}