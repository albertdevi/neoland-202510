import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function modifyReel(userId, textColor, backgroundColor) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.id(userId, 'userId')
    validate.name(textColor, 'textColor')
    validate.name(backgroundColor, 'backgroundColor')

    return fetch(`${import.meta.env.VITE_API_URL}/reels/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${data.getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ textColor, backgroundColor })
    })

        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 204)
                return

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errorMap[error] || SystemError

                    throw new constructor(message)
                })
        })
}