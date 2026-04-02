import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { ButtonBlue } from './commons/ButtonBlue'

import { useContext } from '../../context'

import { logic } from '../../logic' 

import { logger } from '../../logger'

export function ChangeUserImage() {
    logger.debug('ChangeUserImage -> call')

    const { onSuccess, onError } = useContext()

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

    logger.debug('ChangeUserImage -> render')

    return <div>
        <Form onSubmit={handleChangeImageSubmit}>
            <Field alias="image" type="url">Update your image via new URL</Field>

            <ButtonBlue classUserimage="self-center mt-4" type="submit">Update image</ButtonBlue>
        </Form>
    </div>
}