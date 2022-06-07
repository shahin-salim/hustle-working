import { STEPPER } from "../Constants/ActivityStepperMui"


export const stepperAction = (value) => {
    console.log(value);
    return async (dispatch, getState) => {
        console.log("stepper action is activated");
        dispatch({
            type: STEPPER,
            payload: value
        })
    }
}

