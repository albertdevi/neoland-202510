import { Label } from './Label'
import { InputText } from './InputText'

export function Field({ alias, type, children}) {
    return <div className="flex flex-col">
        <Label alias = {alias}>{children}</Label>
        <InputText alias={alias} type={type} />
    </div>
}