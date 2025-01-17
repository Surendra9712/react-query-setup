export interface StepDTO {
    label?: string;
    active?: boolean;
    completed?: boolean;
}

export interface StepProps
    extends StepDTO,
        React.ButtonHTMLAttributes<HTMLButtonElement> {
    index?: number;
}
