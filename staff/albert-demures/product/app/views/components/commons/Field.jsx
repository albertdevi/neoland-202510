import { Label } from './Label'
import { InputText } from './InputText'

export function Field({ alias, type, children, defaultValue, step}) {
    return <div className="flex flex-col">
        <Label alias = {alias}>{children}</Label>
        <InputText alias={alias} type={type} defaultValue={defaultValue} step={step} />
    </div>
}