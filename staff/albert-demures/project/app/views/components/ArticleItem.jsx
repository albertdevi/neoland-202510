import { logger } from '../../logger'
import { ButtonRound } from './commons/ButtonRound'

export function ArticleItem({ article, onGoToArticleDetail }) {

    logger.debug('ArticleItem -> call')

    const handleGoToArticleDetailClick = articleId => onGoToArticleDetail(articleId)

    logger.debug('ArticleItem -> render')


    const zuluDate = new Date(article.date)
    const locaDateString = zuluDate.toLocaleDateString()

    return   <li className="rounded-xl bg-[#8FB3C0] shadow-lg pb-2 flex flex-col gap-2">

      <div className="bg-[#D5EDF6] p-4 rounded-xl shadow-md flex flex-col gap-2 " onClick={() => handleGoToArticleDetailClick(article.id)}>

        <img
          src={article.image0}
          className="w-full  object-cover rounded-lg"
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

      </div>

      <nav className="px-2 py-1 flex justify-end gap-2 w-full">
        <ButtonRound className="bg-[#1C637D]">
          <img src="/edit.svg" alt="edit icon" className="w-4 h-4" />
        </ButtonRound>

        <ButtonRound className="bg-[#1C637D]">
          <img src="/delete.svg" alt="delete icon" className="w-4 h-4" />
        </ButtonRound>
      </nav>

    </li>
}