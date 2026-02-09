import { useState } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { ButtonBlue } from './commons/ButtonBlue'
import { logic } from '../../logic'

export function ChangeUserUsername({ }) {
    console.log('ChangeUserUsername -> call')

    const [message, setMessage] = useState('')

    const handleChangeUsernameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const newUsername = form.newUsername.value
        const newUsernameRepeat = form.newUsernameRepeat.value

        try {
            logic.changeUserUsername(username, newUsername, newUsernameRepeat)

            form.reset()
        } catch (error) {
            setMessage(error.message)
        }

    }

    console.log('ChangeUserUsername -> render')


    return <div>
        <Form onSubmit={handleChangeUsernameSubmit}>
            <Field alias="username" type="ntext">Username</Field>

            <Field alias="newUsername" type="text">New Username</Field>

            <Field alias="newUsernameRepeat" type="text">New Username repeat</Field>

            <ButtonBlue classUsername="self-center mt-4" type="submit">Update Username</ButtonBlue>

        </Form>

        <p>{message}</p>
    </div>

}