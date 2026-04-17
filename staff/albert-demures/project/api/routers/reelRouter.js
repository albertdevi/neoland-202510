import { Router } from 'express'

import {
    getReelHandler,
    modifyReelHandler
    
} from './handlers/index.js'

export const reelRouter = new Router()

reelRouter.get('/:userId/:reelId', getReelHandler)
reelRouter.put('/:userId/:reelId', modifyReelHandler)