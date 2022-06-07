import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CreateGig from '../Pages/CreateGig';
import { useSelector, useDispatch } from 'react-redux';
import { stepperAction } from '../Redux/Actions/activitySetupStepperMui';
import { useLocation } from 'react-router-dom';

const steps = [
    {
        label: 'Create service',
    },
    {
        label: 'Basic',

    },
    {
        label: 'Standard',
    },
    {
        label: 'Premium',
    },
];

const VerticalLinearStepper = (props) => {

    const location = useLocation()

    const dispatch = useDispatch()

    const activeStep = useSelector(state => state.activeStep)

    console.log(props);

    // const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        dispatch(stepperAction(1))
    };

    const handleBack = () => {
        dispatch(stepperAction(-1))
    };

    const handleReset = () => {
        dispatch(stepperAction(-activeStep))
    };

    return (
        <Box >
            <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                    <Step key={step.label}>
                        <StepLabel
                            optional={
                                index === 2 ? (
                                    <Typography variant="caption">Last step</Typography>
                                ) : null
                            }
                        >
                            {step.label}
                        </StepLabel>


                        <StepContent>
                            {props.children[index]}
                            <Box sx={{ mb: 2 }}>
                                {(location.pathname).startsWith("/edit") &&
                                    <div>
                                        <Button
                                            variant="contained"
                                            onClick={handleNext}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            {index === steps.length - 1 ? 'Finish' : 'Continue'}
                                        </Button>
                                        <Button
                                            disabled={index === 0}
                                            onClick={handleBack}
                                            sx={{ mt: 1, mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                    </div>}
                            </Box>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}

export default VerticalLinearStepper;