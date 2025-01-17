import {FieldApi} from "@tanstack/react-form";
import FormError from "./FormError.tsx";

type TextareaFieldProps = {
    field: FieldApi<any, any, any>;
    label: string;
    rows?: number;
    placeholder: string;
};

const Textarea: React.FC<TextareaFieldProps> = ({field, label, rows = 3, placeholder}) => {
    return (
        <div>
            <div className="flex flex-col gap-3">
                <label htmlFor={field.name}>{label}</label>
                <textarea
                    data-error={field.state.meta.isTouched && field.state.meta.errors.length > 0}
                    id={field.name}
                    name={field.name}
                    rows={rows}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="px-3 py-1 rounded border outline-none focus:border-gray-400 focus-visible:border-gray-400 data-[error='true']:border-red-500"
                    placeholder={placeholder}
                />
            </div>
            <FormError field={field}/>
        </div>
    );
};

export default Textarea;
