import React from "react";
import {Backdrop, Button, Modal, Slide} from "@material-ui/core";
import LoginForm from "./LoginForm";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const Login = (props: any) => {

    const classes = useStyles();

    return (
        <div>
            <Button variant={"contained"}
                    color={"primary"}
                    onClick={props.show}
            >
                Log in
            </Button>

            <Modal
                className={classes.modal}
                open={props.open}
                onClose={props.hide}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={props.open} direction={"down"} timeout={200}>
                    <div className={classes.paper}>
                        <LoginForm hide={props.hide} />
                    </div>
                </Slide>

            </Modal>
        </div>
    );
};

export default Login;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        modal: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }),
);