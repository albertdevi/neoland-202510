import { ExistenceError, validate } from "com"
import { data } from '../data/index.js'
import { Article } from './models/index.js'

export function getPublicArticles(userId) {
    validate.id(userId, 'userId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findPublicArticlesByUserId(userId)
        })
        .then(articleDatas => articleDatas.map(articleData => {
            const { id, ownerId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility } = articleData

            return new Article(id, ownerId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility)
        }))
}