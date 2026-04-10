import { getLoggedInUser} from './getLoggedInUser'
import { isUserLoggedIn } from './isUserLoggedIn'
import { loginUser } from './loginUser'
import { logoutUser } from './logoutUser'
import { registerUser } from './registerUser'

import { addArticle } from './addArticle'
import { getArticle } from './getArticle'
import { getArticles } from './getArticles'

export const logic = {
    getLoggedInUser,
    isUserLoggedIn,
    loginUser,
    logoutUser,
    registerUser,

    addArticle,
    getArticle,
    getArticles
}
