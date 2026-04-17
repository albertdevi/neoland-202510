import { logger } from '../../logger'

import { useParams } from 'react-router'

export function ReelItem({ article, onGoToReelDetail }) {

    logger.debug('ReelItem -> call')

    const { userId } = useParams()

    const handleGoToReelDetailClick = () => onGoToReelDetail(userId, article.id)

    logger.debug('ReelItem -> render')

    const zuluDate = new Date(article.date)
    const locaDateString = zuluDate.toLocaleDateString()

    return <li onClick={handleGoToReelDetailClick}
        className="rounded-2xl shadow-md p-2 flex flex-col gap-2 bg-gray-200 p-4 ">
        <img
            src={article.image0}
            className="w-full h-full object-cover rounded-2xl shadow-lg"
        />

        <h2 className="text-3xl font-bold leading-tight tracking-tight">
            {article.title}
        </h2>
        
      {article.subtitle && (
        <>
          <h3 className="text-lg font-semibold leading-snug text-neutral-900">
            {article.subtitle}
          </h3>
        </>
      )}

        <p className="text-xs text-neutral-500">
            {locaDateString}
        </p>

    </li>
}