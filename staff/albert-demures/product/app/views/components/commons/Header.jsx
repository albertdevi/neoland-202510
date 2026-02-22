import { Title } from './Title'
import {Anchor} from './Anchor'


export function Header({ onGoToHome }) {


const handleBackClick = event => {

  onGoToHome() 
}


    return <header className="fixed top-0 z-50 bg-white w-full  border-b border-gray-100 shadow-sm flex items-center justify-between py-3 px-6">

        <Title></Title>
      <div className="fixed top-4 right-4 z-50">
            <Anchor className="flex items-center gap-2 px-4 py-2 rounded-full bg-white text-gray-700 font-medium shadow-md   hover:bg-gray-50  hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-300" onClick={handleBackClick}>&lt; Back</Anchor>
        </div>
      

    </header>
}