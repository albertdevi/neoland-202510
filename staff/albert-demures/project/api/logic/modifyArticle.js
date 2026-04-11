import { ExistenceError, OwnershipError, validate } from 'com'
import { data, ArticleData } from '../data/index.js'

export function modifyArticle(userId, articleId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility) {
    validate.id(userId, 'userId')
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
    validate.name(visibility, 'visibility')

    return data.findUserById(userId)
        .then(userData => {
            if (!userData) throw new ExistenceError('user not found')

            return data.findArticleById(articleId)
        })
        .then(articleData => {
            if (!articleData) throw new ExistenceError('article not found')

            if (articleData.ownerId !== userId) throw new OwnershipError('user not owner of article')

            return data.updateArticle(new ArticleData(articleId, userId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility))
        })
}