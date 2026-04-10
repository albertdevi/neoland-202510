import { Label } from './Label'
import { InputText } from './InputText'


export function InputField({ alias, type, children, defaultValue, step }) {
    return <div className="flex flex-col mt-2">
        <Label alias = {alias}> {children}</Label>
        <InputText alias= {alias} type={type} defaultValue= {defaultValue} step={step} />
        </div >
        }