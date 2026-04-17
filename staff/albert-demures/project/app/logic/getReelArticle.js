import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function getReelArticle(userId, articleId) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.id(articleId, 'articleId')

    return fetch(`${import.meta.env.VITE_API_URL}/articles/reels/${userId}/${articleId}`)

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