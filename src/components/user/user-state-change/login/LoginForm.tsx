import React, {ChangeEvent, useContext, useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import {AccountCircle, Lock} from "@material-ui/icons";
import {FirebaseContext} from "../../../contexts/FirebaseContext";
import firebase from "firebase";
import { ModalContext } from "../../../../wrappers/ModalWrapper"

const LoginForm = (props: any) => {

    const auth = useContext(FirebaseContext)!.auth;

    const { hideModal } = useContext(ModalContext)!;

    const [emailError, setEmailError] = useState<boolean>(false);
    const [pwError, setPwError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [pwErrorMessage, setPwErrorMessage] = useState<string>("");

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [event.target.name]: event.target.value
        });
    };

    const handleError = (error: any) => {
        // except for this, all other errors are for the email, no need for switch case
        if (error.code === 'auth/wrong-password') {
            setPwError(true);
            setPwErrorMessage(error.message)
        } else {
            setEmailError(true);
            setEmailErrorMessage(error.message);
        }
    };

    const resetErrors = () => {
        setEmailError(false);
        setPwError(false);
        setEmailErrorMessage("");
        setPwErrorMessage("");
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        resetErrors();

        auth.signInWithEmailAndPassword(loginData.email, loginData.password)
            .then((cred: firebase.auth.UserCredential) => {
                console.log(cred);
                hideModal();
            })
            .catch((error: any) => {
                handleError(error);
            })
    };

    return (
        <div className="grey-text">
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
                                   error={emailError}
                                   helperText={emailErrorMessage}
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
                                   error={pwError}
                                   helperText={pwErrorMessage}
                        />
                    </Grid>
                </Grid>
            </form>

            <Button variant={"contained"} color="secondary" onClick={hideModal}>
                Close
            </Button>
            <Button variant={"contained"} onClick={handleSubmit} color="primary">
                Login
            </Button>
        </div>
    )
};

export default LoginForm;