export const ERROR = "ERROR";
export const RESET_ERRORS = "RESET_ERRORS";

export const initialState = {
    emailError: false,
    pwError: false,
    emailErrorMessage: "",
    pwErrorMessage: "",
};

const LoginErrorReducer = (state: any, action: any) => {

    switch (action.type) {
        case ERROR:
            if (action.error.code === "auth/wrong-password") {
                return { ...state, emailError: true, emailErrorMessage: action.error.message };
            }
            return { ...state, pwError: true, pwErrorMessage: action.error.message };
        case RESET_ERRORS:
            return initialState;
        default:
            return state;
    }

};

export default LoginErrorReducer;