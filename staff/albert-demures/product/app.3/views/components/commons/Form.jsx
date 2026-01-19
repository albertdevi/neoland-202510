function Form({children, onSubmit}) {
    return <form className="flex flex-col gap-4 w-full max-w-sm mx-auto mt-6" onSubmit= {onSubmit}>
        {children}
    </form>
}