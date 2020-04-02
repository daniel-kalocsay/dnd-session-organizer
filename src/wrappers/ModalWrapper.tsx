import React, {createContext, useContext, useEffect, useState} from "react";
import {Backdrop, Button, Modal, Slide} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export interface ModalContextInterface {
    open: boolean;
    showModal: () => void;
    hideModal: () => void;
}

export const ModalContext = createContext<ModalContextInterface | null>(null);

const ModalWrapper = (props: any) => {

    // set up modal state and state changers for the context provider
    const [open, setOpen] = useState(false);
    const showModal = () => { setOpen(true); };
    const hideModal = () => { setOpen(false); };
    const modalHandler: ModalContextInterface = { open, hideModal, showModal };

    const classes = useStyles();

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

                        {/* provide modal state and state changers here */}
                        <ModalContext.Provider value={modalHandler}>
                            {props.children}
                        </ModalContext.Provider>

                        <br />
                        <Button variant={"contained"} color="secondary" onClick={hideModal}>
                            Close button from wrapper that actually works
                        </Button>
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
