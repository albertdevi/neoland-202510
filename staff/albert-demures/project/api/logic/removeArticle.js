import { ExistenceError, OwnershipError, validate } from 'com'
import { data } from '../data/index.js'

export function removeArticle(userId, articleId) {
    validate.id(userId, 'userId')
    validate.id(articleId, 'articleId')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findArticleById(articleId)
        })
        .then(articleData => {
            if (!articleData) throw new ExistenceError('article not found')

            if (articleData.ownerId !== userId) throw new OwnershipError('user not owner of article')

            return data.deleteArticle(articleId)

        })
}