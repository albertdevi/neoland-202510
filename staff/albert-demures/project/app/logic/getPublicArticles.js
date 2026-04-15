import { data } from '../data'
import { SystemError, AuthError, errorMap, validate } from 'com'

export function getPublicArticles(userId) {

    validate.id(userId, 'userId')

    return fetch(`${import.meta.env.VITE_API_URL}/articles/reels/${userId}`,)

        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 200)
                return res.json()
                    .catch(error => { throw new SystemError('json error') })
                    .then(article => article)

            return res.json()
                .catch(error => { throw new SystemError('json error') })
                .then(body => {
                    const { error, message } = body

                    const constructor = errorMap[error] || SystemError

                    throw new constructor(message)
                })
        })
}
