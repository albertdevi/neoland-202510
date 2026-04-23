import { Title } from './components/commons/Title'
import { Form } from './components/commons/Form'
import { InputField } from './components/commons/InputField'
import { Anchor } from './components/commons/Anchor'
import { PasswordField } from './components/commons/PasswordField'
import { ButtonCTA } from './components/commons/ButtonCTA'
import { logger } from '../logger'

import { useContext } from '../context'

import { logic } from '../logic'

export function Register({ onGoToLogin }) {

    const { onError } = useContext()

    const handleRegisterSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const password = form.password.value
        const passwordRepeat = form.passwordRepeat.value

        try {
            logic.registerUser(name, email, password, passwordRepeat)
                .then(() => {
                    form.reset()

                    onGoToLogin()
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onGoToLogin()
    }

    logger.debug('Register -> render')

    return <div className=" flex flex-col gap-10 py-10 items-center justify-center min-h-screen bg-gradient-to-b from-[#0A1F27] via-[#163f4f] to-[#24657D] sm:gap-8 md:gap-10 py-2 px-4 ">

        <img src='logo.svg' alt='News2Web logo' className='w-30 object-contain' />

        <Title>Register</Title>

        <Form onSubmit={handleRegisterSubmit}>
            <InputField alias='name' type='text'>Name</InputField>

            <InputField alias='email' type='text'>Email</InputField>

            <PasswordField alias='password'>Password</PasswordField>

            <PasswordField alias='passwordRepeat'>Repeat Password</PasswordField>

            <ButtonCTA type="submit">Register</ButtonCTA>

        </Form>


        <footer className="flex flex-col items-center gap-4 w-full max-w-sm mt-4" >
            <div className="flex items-center w-full gap-3">
                <div className='h-px w-full bg-[#58B7DA]'></div>
                <p className='text-[#58B7DA] text-sm font-medium'>O</p>
                <div className='h-px w-full bg-[#58B7DA]'></div>
            </div>
            <p className='text-[#58B7DA] text-sm '>Ya tienes cuenta?</p>
            <Anchor className='text-[#D5EDF6]' onClick={handleLoginClick}>Login</Anchor>
        </footer>

    </div>

} 