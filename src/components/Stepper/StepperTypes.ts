import {StepDTO} from '../Step/StepTypes';

export interface StepperProps extends React.HTMLProps<HTMLDivElement> {
    steps: StepDTO[];
    activeStep?: number;
    stepClicked?: (step: number) => void;
}