import { useState } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { Feedback } from './commons/Feedback'
import { ButtonBlue } from './commons/ButtonBlue'
import { logic } from '../../logic'

export function ChangeUserUsername({ }) {
    console.log('ChangeUserUsername -> call')

   const [feedback, setFeedback] = useState(null)

    const handleChangeUsernameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const newUsername = form.newUsername.value
        const newUsernameRepeat = form.newUsernameRepeat.value

         try {
            logic.changeUserPassword(password, newPassword, newPasswordRepeat)
                .then(() => {

                    form.reset()

                    setFeedback({ message: 'Username succesfully updated', level: 'success' })
                })
                .catch(error => {
                    setFeedback({ message: error.message, level: 'error' })
                })
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
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

        {feedback && <Feedback feedback={feedback} />}
    </div>

}