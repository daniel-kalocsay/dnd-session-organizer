import React from "react";
import {Backdrop, Button, Modal, Slide} from "@material-ui/core";
import RegisterForm from "./RegisterForm";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const Register = (props: any) => {

    const classes = useStyles();

    //TODO make generic Modal(Button) component to avoid duplication of code below (in Login and Register comps)

    return (
        <div>
            <Button variant={"contained"}
                    color={"primary"}
                    onClick={props.show}
            >
                Register
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
                        <RegisterForm hide={props.hide}/>
                    </div>
                </Slide>

            </Modal>
        </div>
    )
};

export default Register;

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
