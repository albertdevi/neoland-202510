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
        className={`rounded-xl shadow-lg p-2 flex flex-col gap-2
      ${article.visibility === 'draft' ? 'bg-gray-500' : 'bg-[#8FB3C0]'} 
    `}
    >
        <img
            src={article.image0}
            className="w-full object-cover rounded-lg"
        />

        <h2 className="text-xl font-semibold text-[#09212A] leading-tight">
            {article.title}
        </h2>

        <h3 className="text-sm text-[#35515C]">
            {article.subtitle}
        </h3>

        <p className="text-xs text-[#5F7D88]">
            {locaDateString}
        </p>

    </li>
}