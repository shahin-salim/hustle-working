import { STEPPER } from "../Constants/ActivityStepperMui"



export const stepperReducer = (state = 0, { type, payload }) => {
    switch (type) {
        case STEPPER:
            return state + payload
        default:
            return state
    }
}