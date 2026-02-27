import { useState } from 'react'

import { Title } from './components/commons/Title'
import { SubTitle } from './components/commons/SubTitle'
import { Form } from './components/commons/Form'
import { Field } from './components/commons/Field'
import { PasswordField } from './components/commons/PasswordField'
import { ButtonBlue } from './components/commons/ButtonBlue'
import { Feedback } from './components/commons/Feedback'

import { logic } from '../logic'
import { CredentialError, ExistenceError, ValidationError } from '../errors'

export function Login({ onUserLoggedIn, onGoToRegister }) {
    console.log('Login -> call')

    const [feedback, setFeedback] = useState(null)

    const handleLoginSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

     try {
            logic.loginUser(username, password)
                .then(() => onUserLoggedIn())
                .catch(error => {
                    if (error instanceof ValidationError)
                        setFeedback({ message: error.message, level: 'warn' })
                    else if (error instanceof ExistenceError || error instanceof CredentialError)
                        setFeedback({ message: error.message, level: 'danger' })
                    else
                        setFeedback({ message: 'sorry, something failed. try again later', level: 'error' })
                })
        } catch (error) {
            if (error instanceof ValidationError)
                setFeedback({ message: error.message, level: 'warn' })
            else
                setFeedback({ message: 'sorry, something failed. try again later', level: 'error' })
        }
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


        {feedback && <Feedback feedback={feedback} />}
    </div>
}