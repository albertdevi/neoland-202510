import { Title } from './components/commons/Title'
import { Form } from './components/commons/Form'
import { InputField } from './components/commons/InputField'
import { Anchor } from './components/commons/Anchor'
import { PasswordField } from './components/commons/PasswordField'
import { ButtonCTA } from './components/commons/ButtonCTA'


import { useContext } from '../context'

import { logic } from '../logic'
import { logger } from '../logger'

export function Login({ onUserLoggedIn, onGoToRegister}) {
//     logger.debug('Login -> call')

const { onError } = useContext()

const handleLoginSubmit = event => {
    event.preventDefault()

    const form = event.target

    const email = form.email.value 
    const password = form.password.value

    try {
        logic.loginUser(email, password)
        .then(() => onUserLoggedIn())
        .catch(error => onError(error))
    } catch (error) {
        onError(error)
    }
}

const handleRegisterClick = event => {
    event.preventDefault()

    onGoToRegister()
}

logger.debug('Login -> render')

return <div className=" flex flex-col gap-10 py-10 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-8 md:gap-10 py-2 px-4  ">
    <Title>Login</Title>

     <img src='logo.svg' alt='News2Web logo' className='w-30 object-contain' />

    <Form onSubmit={handleLoginSubmit}>
    <InputField alias='email' type='text'>Email</InputField>

    <PasswordField alias="password">Password</PasswordField>

    <ButtonCTA className="" type="submit">Login</ButtonCTA>

    </Form>
        <footer className="flex flex-col items-center gap-4 w-full max-w-sm mt-4" >
            <div className="flex items-center w-full gap-3">
                <div className='h-px w-full bg-[#58B7DA]'></div>
                <p className='text-[#58B7DA] text-sm font-medium'>O</p>
                <div className='h-px w-full bg-[#58B7DA]'></div>
            </div>
            <p className='text-[#58B7DA] text-sm '>No tienes cuenta?</p>
            <Anchor className='text-[#D5EDF6]' onClick={handleRegisterClick}>Register</Anchor>
        </footer>
     </div>
}

