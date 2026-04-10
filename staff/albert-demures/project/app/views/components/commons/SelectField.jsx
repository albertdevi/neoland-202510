import { Label } from './Label'
import { Select } from './Select'


export function SelectField({ alias, label, children, defaultValue, }) {
    return <div className="flex flex-col mt-2">
        <Label alias={alias}> {label}</Label>
        <Select alias={alias} defaultValue={defaultValue} children={children} />
    </div >
}