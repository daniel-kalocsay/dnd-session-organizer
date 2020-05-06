import React, {useState, useContext, ChangeEvent, useReducer} from "react";

import firebase from "firebase";
import {FirebaseContext} from "../../../contexts/FirebaseContext";
import {ModalContext} from "../../../../wrappers/ModalWrapper";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";

import AccountCircle from "@material-ui/icons/AccountCircle";
import Lock from "@material-ui/icons/Lock";
import Mail from "@material-ui/icons/Mail";
import RegisterErrorReducer, { initialState, ERROR, RESET_ERRORS} from "../../../reducers/RegisterErrorReducer";

class userModel {
    username: string = "";
    combatfields: string[] = [];

    constructor(username: string, combatfields: string[]) {
        this.username = username;
        this.combatfields = combatfields;
    }
}

const RegisterForm = (props: any) => {
    const {hideModal} = useContext(ModalContext)!;

    const auth = useContext(FirebaseContext)!.auth;
    const usersDB = useContext(FirebaseContext)!.usersRef;

    const [errorState, dispatch] = useReducer(RegisterErrorReducer, initialState);

    const [registrationData, setRegistrationData] = useState({
        email: "",
        password: "",
        username: "",
    });

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({
            ...registrationData,
            [event.target.name]: event.target.value,
        });
    };
    
    const handleSubmit = (event: React.SyntheticEvent) => {
        dispatch({type: RESET_ERRORS});

        auth
            .createUserWithEmailAndPassword(
                registrationData.email,
                registrationData.password
            )
            .then((cred: firebase.auth.UserCredential) => {
                let newUser = Object.assign(
                    {},
                    new userModel(registrationData.username, [])
                );
                usersDB.doc(cred.user!.uid).set(newUser);
                hideModal();
            })
            .catch((error: any) => {
                dispatch({type: ERROR, error: error});
            });
    };

    return (
        <div className="grey-text" style={styles.wrapper}>
            <h2>Register</h2>
            <form>
                {/* username */}
                <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <AccountCircle/>
                    </Grid>

                    <Grid item>
                        <FormControl>
                            <TextField
                                id="register-username"
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
                            <TextField
                                id="register-email"
                                name="email"
                                label="E-mail"
                                required
                                onChange={handleChange}
                                error={errorState.emailError}
                                helperText={errorState.emailErrorMessage}
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
                            <TextField
                                id="register-pw"
                                name="password"
                                label="Password"
                                type="password"
                                required
                                onChange={handleChange}
                                error={errorState.pwError}
                                helperText={errorState.pwErrorMessage}
                            />
                        </FormControl>
                    </Grid>
                </Grid>
            </form>

            <Button variant={"contained"} onClick={handleSubmit} color="primary">
                Register
            </Button>
        </div>
    );
};

export default RegisterForm;

const styles = {
    wrapper: {
        display: "grid",
        gridGap: "2em"
    }
};
