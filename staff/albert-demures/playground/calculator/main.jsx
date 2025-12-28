const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

const useState = React.useState

function App() {
    const displayState = useState('0')
    const displayValue = displayState[0]
    const setDisplayValue = displayState[1]

    const handleOneClicked = () => {
        logic.selectOne()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleTwoClicked = () => {
        logic.selectTwo()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleThreeClicked = () => {
        logic.selectThree()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleFourClicked = () => {
        logic.selectFour()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleFiveClicked = () => {
        logic.selectFive()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleSixClicked = () => {
        logic.selectSix()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleSevenClicked = () => {
        logic.selectSeven()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleEightClicked = () => {
        logic.selectEight()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleNineClicked = () => {
        logic.selectNine()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleZeroClicked = () => {
       logic.selectZero()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleAllClearClicked = () => {
        logic.clearAll()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleDivideClicked = () => {
        logic.selectDivide()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleMultiplyClicked = () => {
        logic.selectMultiply()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleSubtractClicked = () => {
        logic.selectSubtract()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleAddClicked = () => {
        logic.selectAdd()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleResultClicked = () => {
        logic.calculate()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleBackspaceClicked = () => {
        logic.selectBackspace()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleCommaClicked = () => {
        logic.selectComma()

        setDisplayValue(logic.getCurrentValue())
    }

    const handleChangeSignClicked = () => {
        logic.changeSign()

        setDisplayValue(logic.getCurrentValue())
    }

    console.log('App -> render')

    return <div className="border-2 m-2 p-2 rounded-2xl bg-gray-800 text-white">
        <div className="flex justify-end px-4 text-3xl">{displayValue}</div>

        <div className="p-2 flex flex-col gap-2">
            <div className='flex justify-between'>
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleBackspaceClicked}>⌫</div>
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleAllClearClicked}>AC</div>
                <div className="bg-gray-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer">%</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleDivideClicked}>÷</div>
            </div>

            <div className='flex justify-between'>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSevenClicked}>7</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleEightClicked}>8</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleNineClicked}>9</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleMultiplyClicked}>×</div>
            </div>

            <div className='flex justify-between'>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleFourClicked}>4</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleFiveClicked}>5</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSixClicked}>6</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleSubtractClicked}>-</div>
            </div>

            <div className='flex justify-between'>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleOneClicked}>1</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleTwoClicked}>2</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleThreeClicked}>3</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleAddClicked}>+</div>
            </div>

            <div className='flex justify-between'>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleChangeSignClicked}>+/-</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleZeroClicked}>0</div>
                <div className="bg-gray-600 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleCommaClicked}>,</div>
                <div className="bg-orange-400 p-2 rounded-full w-10 h-10 flex justify-center items-center cursor-pointer" onClick={handleResultClicked}>=</div>
            </div>

        </div>
    </div>

}