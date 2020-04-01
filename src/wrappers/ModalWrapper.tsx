import React, {useEffect, useState} from "react";
import {Backdrop, Button, Modal, Slide} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const ModalWrapper = (props: any) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const showModal = () => { setOpen(true); };
    const hideModal = () => { setOpen(false); };

    return (
        <div>
            <Button variant={"contained"}
                    color={"primary"}
                    onClick={showModal}
            >
                {props.buttonName}
            </Button>

            <Modal
                className={classes.modal}
                open={open}
                onClose={hideModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Slide in={open} direction={"down"} timeout={200}>
                    <div className={classes.paper}>

                        {/*TODO figure out how to pass hideModal to child here*/}
                        {props.children}
                    </div>
                </Slide>

            </Modal>
        </div>
    )
};

export default ModalWrapper;

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