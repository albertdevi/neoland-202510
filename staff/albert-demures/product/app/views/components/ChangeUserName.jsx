import { useState, useEffect } from 'react'
import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { ButtonBlue } from './commons/ButtonBlue'

import { useContext } from '../../context'

import { logic } from '../../logic' 

import { logger } from '../../logger'

export function ChangeUserName() {
    logger.debug('ChangeUserName -> call')

    const { onSuccess, onError } = useContext()

    const [user, setUser] = useState(null)
    const [name, setName] = useState('')

  useEffect(() => {
        try {
            logic.getLoggedInUser()
                .then(user => setName(user.name))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleChangeNameSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value

        try {
            logic.changeUserName(name)
                .then(() => onSuccess('user name successfully updated'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ChangeUserName -> render')

    return <div>
        <Form onSubmit={handleChangeNameSubmit}>
            <Field alias="name" type="text" placeholder={user?.username}>Name, your actual is {user?.name} </Field>

            <ButtonBlue classUsername="self-center mt-4" type="submit">Update name</ButtonBlue>
        </Form>
    </div>
}