export function Feedback({ feedback }) {
    return <p className={`text-center text-white text-sm py-2 w-full fixed top-0 left-0 z-[9999] ${feedback.level === 'success' ?
        'bg-green-700'
        :
        feedback.level === 'warn' ?
            'bg-yellow-600'
            :
            feedback.level === 'danger' ?
                'bg-orange-600'
                :
                feedback.level === 'error' ?
                    'bg-red-600'
                    : ''
        }`}>{feedback.message}</p>
}