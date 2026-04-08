import { SystemError } from 'com'
import { ArticleModel } from '../mongoose/index.js'

export function insertArticle(articleData) {
    const { ownerId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility } = articleData

    const articleModel = new ArticleModel({ owner: ownerId, title, subtitle, date, paragraph0, image0, paragraph1, image1, paragraph2, image2, paragraph3, image3, visibility })

    return articleModel.save()
    .catch(error => { throw new SystemError(error.message) })
    .then(articleModel => { })
}