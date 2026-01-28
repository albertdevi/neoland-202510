import { useState } from 'react'


import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { ButtonBlue } from './components/commons/ButtonBlue'

import { logic } from '../logic'

export function Login({ onGoToHome, onGoToRegister }) {
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

        <Form onSubmit={handleLoginSubmit}>
            <Field alias="username" type="text">Username</Field>

            <PasswordField alias="password">Password</PasswordField>

            <ButtonBlue className="" type="submit" >Login</ButtonBlue>
        </Form>

        <a className="text-gray-700 text-lg leading-loose max-w-md mx-auto mt-4 text-center cursor-pointer underline font-bold" onClick={handleRegisterClick}>Register</a>

        <p className="text-red-600 text-sm mt-2 font-medium"> {message} </p>
    </div>
}