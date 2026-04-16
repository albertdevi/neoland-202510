import { ExistenceError, OwnershipError, validate } from "com"
import { data } from '../data/index.js'
import { Article } from './models/index.js'

export function getPublicArticle(userId, articleId) {
    validate.id(userId, 'userId')
    validate.id(articleId, 'articleId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findPublicArticleById(articleId)
        })
        .then(articleData => {
            if (!articleData) throw new ExistenceError('article not found')

            if (articleData.ownerId !== userId) throw new OwnershipError('user not author of article')

            const { id, ownerId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility } = articleData

            return new Article(id, ownerId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility)
        })
}