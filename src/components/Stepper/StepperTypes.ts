export interface StepperProps{
    steps: string[];
    activeStep?: number;
    stepClicked?: (step: number) => void;
}