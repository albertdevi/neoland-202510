import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { ButtonBlue } from './commons/ButtonBlue'

import { logic } from '../../logic'

export function ChangeUserUsername({ onError, onSuccess}) {
    console.log('ChangeUserUsername -> call')

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

                    onSuccess('userName successfully updated')
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    console.log('ChangeUserUsername -> render')

    return <div>
        <Form onSubmit={handleChangeUsernameSubmit}>
            <Field alias="username" type="text">Username</Field>

            <Field alias="newUsername" type="text">New Username</Field>

            <Field alias="newUsernameRepeat" type="text">New Username repeat</Field>

            <ButtonBlue classUsername="self-center mt-4" type="submit">Update Username</ButtonBlue>
        </Form>
    </div>
}