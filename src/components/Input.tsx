import {FieldApi} from "@tanstack/react-form";
import FormError from "./FormError.tsx";
import {HTMLInputTypeAttribute} from "react";

type InputFieldProps = {
    field: FieldApi<any, any, any>;
    label: string;
    type?: HTMLInputTypeAttribute;
    placeholder: string;
};

const Input: React.FC<InputFieldProps> = ({field, label, type = "text", placeholder}) => {
    return (
        <div>
            <div className="flex flex-col gap-3">
                <label htmlFor={field.name}>{label}</label>
                <input
                    data-error={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                    id={field.name}
                    name={field.name}
                    type={type}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(type && type === 'number' ? Number(e.target.value) : e.target.value)}
                    className="px-3 py-1 rounded border outline-none focus:border-gray-400 focus-visible:border-gray-400 data-[error='true']:border-red-500"
                    placeholder={placeholder}
                />
            </div>
            <FormError field={field}/>
        </div>
    );
};

export default Input;
