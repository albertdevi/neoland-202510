import { useState } from  'react'

import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'

import { logic } from '../logic'

export function Register({ onGoToLogin }) {
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

        <Form onSubmit={handleRegisterSubmit}>
            <Field alias='name' type='text'>Name</Field>

            <Field alias='email' type='text'>Email</Field>

            <Field alias='username' type='text'>Username</Field>

            <PasswordField alias='password'>Password</PasswordField>

            <PasswordField alias='passwordRepeat'>Repeat Password</PasswordField>

            <ButtonBlue type="submit">Register</ButtonBlue>
        </Form>

        <a href="" className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center cursor-pointer underline font-bold" onClick={handleLoginClick}>Login</a>

        <p className="text-red-600 text-sm mt-2 font-medium">{message}</p>

    </div>
}