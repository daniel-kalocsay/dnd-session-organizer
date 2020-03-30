import React, {ChangeEvent, useContext, useState} from "react";
import {Button, Grid, TextField} from "@material-ui/core";
import {AccountCircle, Lock} from "@material-ui/icons";
import {FirebaseContext} from "../../../contexts/FirebaseContext";
import firebase from "firebase";

const LoginForm = (props: any) => {

    const auth = useContext(FirebaseContext)!.auth;

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

        if (error.code === 'auth/wrong-password') {
            setPwError(true);
            setPwErrorMessage(error.message)
        } else {
            setEmailError(true);
            setEmailErrorMessage(error.message);
        }
    };

    const handleSubmit = (event: React.SyntheticEvent) => {
        setEmailError(false);
        setPwError(false);
        setEmailErrorMessage("");
        setPwErrorMessage("");

        auth.signInWithEmailAndPassword(loginData.email, loginData.password)
            .then((cred: firebase.auth.UserCredential) => {
                console.log(cred);
                props.hide();
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
                        <TextField id="input-email"
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
                        <TextField id="input-pw"
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

            <Button variant={"contained"} color="secondary" onClick={props.hide}>
                Close
            </Button>
            <Button variant={"contained"} onClick={handleSubmit} color="primary">
                Login
            </Button>
        </div>
    )
};

export default LoginForm;