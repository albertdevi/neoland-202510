import { SystemError } from 'com'
import { ArticleModel } from '../mongoose/index.js'

export function deleteAllArticles() {
    return ArticleModel.deleteMany()
    .catch(error => { throw new SystemError(error.message) })
    .then(result =>  { })
}