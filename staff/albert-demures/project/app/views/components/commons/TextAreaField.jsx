import { Label } from './Label'
import { TextArea } from './TextArea'


export function TextAreaField({ alias, type, children, defaultValue,}) {
    return <div className="flex flex-col mt-2">
        <Label alias = {alias}> {children}</Label>
        <TextArea alias= {alias} type={type} defaultValue= {defaultValue}  />
        </div >
        }