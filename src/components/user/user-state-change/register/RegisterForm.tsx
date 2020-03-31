import React, {useState, useContext, ChangeEvent} from "react";
import {FirebaseContext} from "../../../contexts/FirebaseContext";
import {Button, Grid, TextField, FormControl} from "@material-ui/core";
import {AccountCircle, Lock, Mail} from "@material-ui/icons";
import firebase from "firebase";

class userModel {
    username: string = "";
    combatfields: string[] = [];

    constructor(username: string, combatfields: string[]) {
        this.username = username;
        this.combatfields = combatfields;
    }
}

const RegisterForm = (props: any) => {
    const auth = useContext(FirebaseContext)!.auth;
    const usersDB = firebase.firestore().collection("users");

    const [emailError, setEmailError] = useState<boolean>(false);
    const [pwError, setPwError] = useState<boolean>(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState<string>("");
    const [pwErrorMessage, setPwErrorMessage] = useState<string>("");
    
    const [registrationData, setRegistrationData] = useState({
        email: "",
        password: "",
        username: ""
    });


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({
            ...registrationData,
            [event.target.name]: event.target.value
        });
    };

    const handleError = (error: any) => {
        switch (error.code) {
            case "auth/email-already-in-use":
                setEmailError(true);
                setEmailErrorMessage(error.message);
                break;
            case "auth/invalid-email":
                setEmailError(true);
                setEmailErrorMessage(error.message);
                break;
            case "auth/operation-not-allowed":
                //TODO do i need to cover this case?
                break;
            case "auth/weak-password":
                setPwError(true);
                setPwErrorMessage(error.message);
                break;
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

        auth.createUserWithEmailAndPassword(
            registrationData.email,
            registrationData.password
        )
            .then((cred: firebase.auth.UserCredential) => {
                let newUser = Object.assign(
                    {},
                    new userModel(registrationData.username, [])
                );
                usersDB.doc(cred.user!.uid).set(newUser);
                props.hide();

            })
            .catch((error: any) => {
                handleError(error);
            });
    };

    return (
        <div className="grey-text">
            <h2>Register</h2>
            <form>
                {/* username */}
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle/>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <TextField id="register-username"
                                   name="username"
                                   label="Username"
                                   required
                                   onChange={handleChange}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {/*email*/}
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Mail/>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <TextField id="register-email"
                                   name="email"
                                   label="E-mail"
                                   required
                                   onChange={handleChange}
                                   error={emailError}
                                   helperText={emailErrorMessage}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {/*password*/}
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <Lock/>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <TextField id="register-pw"
                                   name="password"
                                   label="Password"
                                   type="password"
                                   required
                                   onChange={handleChange}
                                   error={pwError}
                                   helperText={pwErrorMessage}
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                {/*confirm password*/}
                {/*<Grid container spacing={1} alignItems="flex-end">*/}
                {/*    <Grid item>*/}
                {/*        <Lock/>*/}
                {/*    </Grid>*/}

                {/*    <Grid item>*/}
                {/*        <FormControl>*/}
                {/*            <TextField id="register-confirm-pw"*/}
                {/*                   name="password"*/}
                {/*                   label="Confirm password"*/}
                {/*                   type="password"*/}
                {/*                   required*/}
                {/*            />*/}
                {/*        </FormControl>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}

                <Button variant={"contained"} color="secondary" onClick={props.hide}>
                    Close
                </Button>
                <Button variant={"contained"} onClick={handleSubmit} color="primary" >
                    Register
                </Button>

            </form>
        </div>
    )
};

export default RegisterForm;