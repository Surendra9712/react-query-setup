import {FieldApi} from "@tanstack/react-form";

export default function FormError({field}: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em className="text-red-600 text-sm">{field.state.meta.errors.join(", ")}</em>
            ) : null}
        </>
    )
}