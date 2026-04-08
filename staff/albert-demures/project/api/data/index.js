export* from './models/index.js'

import { insertUser } from './insertUser.js'
import { findUserByEmail } from './findUserByEmail.js'
import { findUserByName  } from './findUserByname.js'
import { findUserById } from './findUserById.js'
import { updateUser } from './updateUser.js'
import { deleteAllUsers } from './deleteAllUsers.js'


import { insertArticle } from './insertArticle.js'
import { findArticleById } from './findArticleById.js'
import { findArticlesByUserId } from './findArticlesByUserId.js'


export const data = {
    insertUser,
    findUserByEmail,
    findUserById,
    findUserByName,
    updateUser,
    deleteAllUsers,

    insertArticle,
    findArticleById,
    findArticlesByUserId,

}