import { useState, useEffect } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { ButtonBlue } from './commons/ButtonBlue'

import { useContext } from '../../context'

import { logic } from '../../logic' 
import { logger } from '../../logger'

export function ChangeUserUsername() {
    logger.debug('ChangeUserUsername -> call')

     const { onSuccess, onError } = useContext()

    const handleChangeUsernameSubmit = event => {
        event.preventDefault()

        const form = event.target
        const username = form.username.value

        try {
            logic.changeUserUsername(username)
                .then(() => onSuccess('username successfully updated'))
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    logger.debug('ChangeUserUsername -> render')

    return <div>
        <Form onSubmit={handleChangeUsernameSubmit}>
            <Field alias="username" type="text">Username</Field>


            <ButtonBlue classUsername="self-center mt-4" type="submit">Update Username</ButtonBlue>
        </Form>
    </div>
}