import { model } from 'mongoose'
import { articleSchema } from '../schemas/index.js'

export const ArticleModel = model('Article', articleSchema)