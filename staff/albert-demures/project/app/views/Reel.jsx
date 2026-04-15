import { useState, useEffect } from 'react'

import { logger } from '../logger'

import { ReelItem } from './components/ReelItem'

import { useContext } from '../context'

import { logic } from '../logic'

import { useParams } from 'react-router'

export function Reel({onGoToReelDetail}) {
    logger.debug('Reels -> call')

    const { userId } = useParams()

    const { onError } = useContext()

    const [articles, setArticles] = useState([])

    useEffect(() => {
        logger.debug('ArticleList -> useEffect')

        try {
            logic.getPublicArticles(userId )
                .then(articles => {
                    setArticles(articles)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    const handleGoToReelDetail = (userId, articleId) => onGoToReelDetail(userId, articleId)

    logger.debug('ArticleList -> render')

    return <div className='flex flex-col justify-start py-2 px-4 items-center justify-center sm:gap-4 md:gap-10'>
    
        <ul className="flex flex-col gap-8 mt-2 mb-8">
            {articles.map(article => <ReelItem key={article.id} article={article} onGoToReelDetail={handleGoToReelDetail}/>)}
        </ul>

    </div>
}