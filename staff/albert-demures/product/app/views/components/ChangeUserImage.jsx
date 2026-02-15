import { useState, useEffect } from 'react'

import { Form } from './commons/Form'
import { Field } from './commons/Field'
import { Feedback } from './commons/Feedback'
import { ButtonBlue } from './commons/ButtonBlue'
import { logic } from '../../logic'

export function ChangeUserImage({ }) {
    console.log('ChangeUserImage -> call')

    const [feedback, setFeedback] = useState(null)
    const [user, setUser] = useState(null)
    const [name, setName] = useState('') 


    useEffect(() => {
            logic.getLoggedInUser()
                .then(user => setUser(user))
                .catch(error => setFeedback({ message: error.message, level: 'error' }))
    }, [])



    const handleChangeImageSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value

        try {
            logic.changeUserImage(image)
                .then(() => {

                    form.reset()

                    setFeedback({ message: 'Image succesfully updated', level: 'success' })
                })
                .catch(error => {
                    setFeedback({ message: error.message, level: 'error' })
                })
        } catch (error) {
            setFeedback({ message: error.message, level: 'error' })
        }
    }

    console.log('ChangeUserImage -> render')


    return <div>
        <Form onSubmit={handleChangeImageSubmit}>
            {user && (<Field alias="image" type="text" placeholder={user?.userimage}>Update your image url </Field>

            )}

            <ButtonBlue classUserimage="self-center mt-4" type="submit">Update image</ButtonBlue>

        </Form>

        {feedback && <Feedback feedback={feedback} />}
    </div>

}