import { useState, useEffect } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { ButtonBlue } from './commons/ButtonBlue'
import { logic } from '../../logic'

export function ChangeUserImage({ onError, onSuccess}) {
    console.log('ChangeUserImage -> call')

    const handleChangeImageSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value

          try {
            logic.changeUserImage(image)
                .then(() => {
                    form.reset()

                    onSuccess('user image successfully updated')
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }

    console.log('ChangeUserImage -> render')


    return <div>
        <Form onSubmit={handleChangeImageSubmit}>
           <Field alias="image" type="url">Update your image via new URL</Field>

            <ButtonBlue classUserimage="self-center mt-4" type="submit">Update image</ButtonBlue>

        </Form>
    </div>
}