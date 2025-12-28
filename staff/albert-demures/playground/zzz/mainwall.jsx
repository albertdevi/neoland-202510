const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)

const useState = React.useState

function App() {
    console.log('App -> call')
    const messagesState = useState(['Hello, World (Iroh, 2025-12-1)'])
    const messages = messagesState[0]
    const setMessages = messagesState[1]

    // Creo un evento que se ejecuta al pulsar submit.
    const handleMessageSubmit = event => {

        //Evita que la página se recargue al enviar el formulario.
        event.preventDefault()

        /*
        const message = document.getElementById('message').value
        const name = document.getElementById('name').value
        const date = Date()

        setMessages ([message + ' (' + name + ', '  + date + ')'])
        */

        //Creo esta constante por comodidad, form = al target del evento 
        const form = event.target

        //Creo varias constantes para ir recogiendo valores
        const message = form.message.value
        const name = form.name.value
        const date = new Date()
        const year = date.getFullYear()
        const month = date.getMonth() + 1
        const day = date.getDate()

        //Para crear una constante (newMessage) con el mensaje completo.
        // const newMessage = message + ' (' + name + ', ' + date.toLocaleDateString() + ')'
        const newMessage = message + ' (' + name + ', ' + year + '-' + month + '-' + day + ')'

        // Creo un nuevo array para no modificar directamente el estado (inmutabilidad)
        const newMessages = []

        // Iteración que recorre todos los mensajes
        for (let i = 0; i < messages.length; i++) {
            const message = messages[i]

            //Añado el message a NewMessages
            newMessages.push(message)
        }

        //Añado el new newMessage, al array de newMessages
        newMessages.push(newMessage)
        
        // Actualizo el estado de messages, lo que provoca un nuevo render del componente
        setMessages(newMessages)

        //Reseteo los campos que hay en el formulario
        form.reset()
    }

    console.log('App -> render')

    //creo una costante, un Array que entren todos los list items.
    const listItems = []

    // Una iteración, que pasa por todos los messages.
    for (let i = 0; i < messages.length; i++) {
        const message = messages[i]

        //Creo una constante listItem, formado por un list item, con el mensaje completo
        const listItem = <li>
            <p>{message}</p>
        </li>

        //Añado el list item con el mensaje creado, al Array de los listItems.
        listItems.push(listItem)
    }
    
    // Renderizo el formulario para dejar un nuevo mensaje en el wall.
    return <div className="flex flex-col gap-2 p-2">
        <h1 className="text-3xl">Wall</h1>

        <ul className="p-2">
                {listItems}
        </ul>

        <form className="flex flex-col gap-2 border p-2" onSubmit={handleMessageSubmit}>
            <h2>Leave your message on the wall!</h2>

            <label htmlFor="message">Message</label>
            <input className="border" type="text" id="message"
                placeholder="message" />

            <label htmlFor="name">Name</label>
            <input className="border" type="text" id="name"
                placeholder="name" />

            <button className="border bg-black text-white" type="submit">Send</button>
        </form>
    </div>
}