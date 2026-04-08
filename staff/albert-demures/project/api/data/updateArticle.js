import { SystemError } from 'com'
import { ArticleModel } from '../mongoose/index.js'

export function updateArticle(articleData) {
    return ArticleModel.updateOne({ _id: articleData.id }, { $set: articleData})
    .catch(error => { throw new SystemError(error.message) })
    .then(result => { })
}