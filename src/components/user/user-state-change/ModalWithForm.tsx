import React, {useState} from "react";
import {Backdrop, Button, Modal, Slide} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const ModalWithForm = (props: any) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const showModal = () => { setOpen(true); };
    const hideModal = () => { setOpen(false); };

    //TODO make this work

    return (
        <div>
            <Button variant={"contained"}
                    color={"primary"}
                    onClick={props.show}
            >
                {props.buttonName}
            </Button>

            <Modal
                className={classes.modal}
                open={props.form.open}
                onClose={props.form.hide}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={open} direction={"down"} timeout={200}>
                    <div className={classes.paper}>
                        <props.form />
                    </div>
                </Slide>

            </Modal>
        </div>
    )
};

export default ModalWithForm;

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