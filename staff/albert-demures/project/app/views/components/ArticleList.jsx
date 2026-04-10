import { useState, useEffect } from 'react'

import { ArticleItem } from './ArticleItem'

import { useContext } from '../../context'

import { logic } from '../../logic'

import { logger } from '../../logger'

export function ArticleList({ }) {
    logger.debug('ArticleList -> call')

    const { onError } = useContext

    const [articles, setArticles] = useState([])
    const [petId, setPetId] = useState(null)

    useEffect(() => {
        logger.debug('ArticleList -> useEffect')

        try {
            logic.getArticles()
                .then(articles => {
                    setArticles(articles)
                })
                .catch(error => onError(error))
        } catch (error) {
            onError(error)
        }
    }, [])

    logger.debug('ArticleList -> render')

    return <div>
        <ul className="flex flex-col gap-8 mt-2">
            {articles.map(article => <ArticleItem key={article.id} article={article} />)}
        </ul>
    </div>
}