export const EMAIL_ERROR = "EMAIL_ERROR";
export const PASSWORD_ERROR = "PASSWORD_ERROR";
export const RESET_ERRORS = "RESET_ERRORS";

export const initialState = {
    emailError: false,
    pwError: false,
    emailErrorMessage: "",
    pwErrorMessage: "",
};

const LoginErrorReducer = (state: any, action: any) => {
    switch (action.type) {
        case EMAIL_ERROR:
            return {
                ...state,
                emailError: true,
                emailErrorMessage: action.errorMessage
            };
        case PASSWORD_ERROR:
            return {
                ...state,
                pwError: true,
                pwErrorMessage: action.errorMessage
            };
        case RESET_ERRORS:
            return initialState;
        default:
            return state;
    }
};

export default LoginErrorReducer;