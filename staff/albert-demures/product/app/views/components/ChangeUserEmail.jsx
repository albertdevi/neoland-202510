import { useState } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { ButtonBlue } from './commons/ButtonBlue'
import { logic } from '../../logic'


export function ChangeUserEmail({ onError, onSuccess}) {
    console.log('ChangeUserEmail -> call')

    const [feedback, setFeedback] = useState(null)

    const handleChangeEmailSubmit = event => {
        event.preventDefault()

        const form = event.target

        const email = form.email.value
        const newEmail = form.newEmail.value
        const newEmailRepeat = form.newEmailRepeat.value
        
      try {
            logic.changeUserEmail(email, newEmail, newEmailRepeat)
                .then(() => {
                    form.reset()

                    onSuccess('user e-mail successfully updated')
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    console.log('ChangeUserEmail -> render')


    return <div >
        <Form onSubmit={handleChangeEmailSubmit}>
            <Field alias="email" type="email">E-mail</Field>

            <Field alias="newEmail" type="email">New e-mail</Field>

            <Field alias="newEmailRepeat" type="email">New e-mail repeat</Field>

            <ButtonBlue className="self-center mt-4" type="submit">Update e-mail</ButtonBlue>
        </Form>

{feedback && <Feedback feedback={feedback}/>}
    </div>
}