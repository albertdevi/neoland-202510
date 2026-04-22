import { logger } from '../../logger'

import { useParams } from 'react-router'

export function ReelItem({ reel, article, onGoToReelDetail }) {

    logger.debug('ReelItem -> call')

    const { userId } = useParams()

    const handleGoToReelDetailClick = (userId, articleId) => onGoToReelDetail(userId, articleId)

    const textColor = reel?.textColor || '#000000'
    const backgroundColor = reel?.backgroundColor || '#afafaf'

    logger.debug('ReelItem -> render')

    const zuluDate = new Date(article.date)
    const locaDateString = zuluDate.toLocaleDateString()

    return <li onClick={() => handleGoToReelDetailClick(userId, article.id)}
             style={{
                color: textColor,
                backgroundColor: backgroundColor
            }}
        className="rounded-2xl shadow-md flex flex-col gap-2 p-4 ">
        <img
            src={article.image0}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
        />

        <h2 className="text-3xl font-bold leading-tight tracking-tight">
            {article.title}
        </h2>
        
      {article.subtitle && (
        <>
          <h3 className="text-lg font-semibold leading-snug ">
            {article.subtitle}
          </h3>
        </>
      )}

        <p className="text-xs ">
            {locaDateString}
        </p>
    </li>
}