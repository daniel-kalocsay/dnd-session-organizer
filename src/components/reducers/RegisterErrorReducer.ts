export const ERROR = "ERROR";
export const RESET_ERRORS = "RESET_ERRORS";

export const initialState = {
    emailError: false,
    pwError: false,
    emailErrorMessage: "",
    pwErrorMessage: "",
};

const RegisterErrorReducer = (state: any, action: any) => {

    switch (action.type) {
        case ERROR:
            switch (action.error.code) {
                case "auth/email-already-in-use":
                    return { ...state, emailError: true, emailErrorMessage: action.error.message };
                case "auth/invalid-email":
                    return { ...state, emailError: true, emailErrorMessage: action.error.message };
                case "auth/operation-not-allowed":
                    // do i need to cover this case?
                    return state;
                case "auth/weak-password":
                    return { ...state, pwError: true, pwErrorMessage: action.error.message };
            }
            break;

        case RESET_ERRORS:
            return initialState;
        default:
            return state;
    }

};

export default RegisterErrorReducer;