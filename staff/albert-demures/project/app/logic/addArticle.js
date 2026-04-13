import { data } from '../data'
import { validate, SystemError, AuthError, errorMap } from 'com'

export function addArticle(title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility) {
    if (data.getToken() === null) throw new AuthError('user not logged in')

    validate.name(title, 'title')
    if (subtitle) validate.name(subtitle, 'subtitle')
    validate.date(date, 'date')
    validate.name(paragraph0, 'paragraph0')
    if (image0) validate.url(image0, 'image0')
    if (paragraph1) validate.name(paragraph1, 'paragraph1')
    if (image1) validate.url(image1, 'image1')
    if (paragraph2) validate.name(paragraph2, 'paragraph2')
    if (image2) validate.url(image2, 'image2')
    if (paragraph3) validate.name(paragraph3, 'paragraph3')
    if (image3) validate.url(image3, 'image3')
    validate.visibility(visibility, 'visibility')

    return fetch(`${import.meta.env.VITE_API_URL}/articles`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${data.getToken()}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility })
    })
        .catch(error => { throw new SystemError('connection error') })
        .then(res => {
            const { status } = res

            if (status === 201)
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