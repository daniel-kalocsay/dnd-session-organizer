import React, {ChangeEvent, useContext, useReducer, useState} from "react";

import firebase from "firebase";
import { FirebaseContext } from "../../../contexts/FirebaseContext";
import { ModalContext } from "../../../../wrappers/ModalWrapper"

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import LoginErrorReducer, { initialState, ERROR, RESET_ERRORS } from "../../../reducers/LoginErrorReducer";

const LoginForm = (props: any) => {

    const auth = useContext(FirebaseContext)!.auth;
    const { hideModal } = useContext(ModalContext)!;

    const [errorState, dispatch] = useReducer(LoginErrorReducer, initialState);

    const [loginData, setLoginData] = useState({email: "", password: ""});

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        dispatch({...errorState, type: RESET_ERRORS});

        auth.signInWithEmailAndPassword(loginData.email, loginData.password)
            .then((cred: firebase.auth.UserCredential) => {
                console.log(cred);
                hideModal();
            })
            .catch((error: any) => {
                dispatch({type: ERROR, error: error});
            })
    };

    return (
        <div className="grey-text" style={styles.wrapper}>
            <h2>Login</h2>
            <form>
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle/>
                    </Grid>
                    <Grid item>
                        <TextField id="login-email"
                                   name="email"
                                   label="E-mail"
                                   onChange={handleChange}
                                   required
                                   error={errorState.emailError}
                                   helperText={errorState.emailErrorMessage}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Lock/>
                    </Grid>
                    <Grid item>
                        <TextField id="login-pw"
                                   name="password"
                                   label="Password"
                                   type="password"
                                   onChange={handleChange}
                                   required
                                   error={errorState.pwError}
                                   helperText={errorState.pwErrorMessage}
                        />
                    </Grid>
                </Grid>
            </form>

            <Button variant={"contained"} onClick={handleSubmit} color="primary">
                Login
            </Button>
        </div>
    )
};

export default LoginForm;

const styles = {
    wrapper: {
        display: "grid",
        gridGap: "2em"
    }
};