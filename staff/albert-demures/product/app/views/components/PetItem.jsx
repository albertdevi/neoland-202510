       import { logger } from '../../logger'
       
       export function PetItem({pet, onGoToPetDetail, onRemovePetClick}) {

            logger.debug('PetItem -> call')

            const handleGoToPetDetailClick = petId => onGoToPetDetail(petId)

            const handleRemovePetClick = petId => onRemovePetClick(petId)

            logger.debug('PetItem -> render')

            return <li key = {pet.id} className="flex gap-8 my-4 items-center p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow" onClick={() => handleGoToPetDetailClick(pet.id)}>
                    <div className="flex items-center gap-4">
                        <img src={pet.image} className="rounded-full w-20 h-20 object-cover border-2 border-blue-500" />

                        <p>{pet.name}</p>

                    </div>

                    <button className="w-10 h-10 bg-gray-400 text-white rounded-full flex items-center justify-center self-center ml-auto shadow-md hover:bg-gray-500 active:scale-95 transition-all duration-200 justify-self-end" onClick={event => {
                        event.stopPropagation()

                        handleRemovePetClick(pet.id)

                    }}>🗑</button>
                </li>
                }