import { logger } from '../../logger'
import { ButtonRound } from './commons/ButtonRound'

export function ArticleItem({ article, onGoToArticleDetail, onRemoveArticleClick, onGoToModifyArticle }) {

  logger.debug('ArticleItem -> call')

  const handleGoToArticleDetailClick = (articleId) => onGoToArticleDetail(articleId)

  const handleRemoveArticleClick = articleId => onRemoveArticleClick(articleId)

  const handleGoToModifyArticle = articleId => onGoToModifyArticle(articleId)

  logger.debug('ArticleItem -> render')


  const zuluDate = new Date(article.date)
  const locaDateString = zuluDate.toLocaleDateString()

  return <li
    className={`rounded-xl shadow-lg pb-2 flex flex-col gap-2
      ${article.visibility === 'draft' ? 'bg-gray-500' : 'bg-[#8FB3C0]'}
    `}
  >

    <div className={` px-4 pb-4 pt-3 rounded-xl shadow-md flex flex-col gap-2 
    ${article.visibility === 'draft' ? 'bg-gray-300' : 'bg-[#D5EDF6]'}`}
      onClick={() => handleGoToArticleDetailClick(article.id)}>

      <div className="relative">
        <img
          src={article.image0}
          className="w-full object-cover rounded-lg"
        />

        <span className="
    absolute top-2 right-2 bg-black/40 text-white text-xs font-semibold px-2 py-1 rounded-full backdrop-blur-sm uppercase
  ">
          {article.visibility}
        </span>
      </div>

      <h2 className="text-xl font-semibold text-[#09212A] leading-tight">
        {article.title}
      </h2>

      {article.subtitle && (
        <>
          <h3 className="text-sm text-[#35515C]">
            {article.subtitle}
          </h3>
        </>
      )}

      <p className="text-xs text-[#5F7D88]">
        {locaDateString}
      </p>

    </div>

    <nav className="px-2 py-1 flex justify-end gap-2 w-full" >

      <ButtonRound className="bg-[#1C637D]" onClick={(event) => {
        event.stopPropagation()
        handleGoToModifyArticle(article.id)
      }}
      >
        <img src="/edit.svg" alt="edit icon" className="w-4 h-4" />
      </ButtonRound>

      <ButtonRound className="bg-[#1C637D]" onClick={event => {
        event.stopPropagation()

        handleRemoveArticleClick(article.id)
      }}>
        <img src="/delete.svg" alt="delete icon" className="w-4 h-4" />
      </ButtonRound>
    </nav>

  </li>
}