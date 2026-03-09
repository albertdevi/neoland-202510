import { useState, useEffect } from 'react'
import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { ButtonBlue } from './commons/ButtonBlue'

import { logic } from '../../logic'

export function ChangeUserName({ onError, onSuccess }) {
    console.log('ChangeUserName -> call')

    const [feedback, setFeedback] = useState(null)
    const [user, setUser] = useState(null)
    const [name, setName] = useState('')

    useEffect(() => {
        logic.getLoggedInUser()
            .then(user => setUser(user))
            .catch(error => setFeedback({ message: error.message, level: 'error' }))
    }, [])

    const handleChangeNameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value

        try {
            logic.changeUserName(name)
                .then(() => {

                    form.reset()

                    onSuccess('name successfully updated')

                    setFeedback({ message: 'Name succesfully updated', level: 'success' })
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    console.log('ChangeUserName -> render')

    return <div>
        <Form onSubmit={handleChangeNameSubmit}>
            <Field alias="name" type="text" placeholder={user?.username}>Name, your actual is {user?.name} </Field>

            <ButtonBlue classUsername="self-center mt-4" type="submit">Update name</ButtonBlue>
        </Form>
    </div>
}