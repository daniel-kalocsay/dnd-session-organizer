import React, {createContext, useContext, useEffect, useState} from "react";

import Backdrop from "@material-ui/core/Backdrop";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";
import Slide from "@material-ui/core/Slide";

import createStyles from "@material-ui/core/styles/createStyles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

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
            <Button variant={props.variant ? props.variant : "contained"}
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
                        <div className={classes.closeDiv}>
                            <Button
                                className={classes.closeX}
                                variant={"text"}
                                onClick={hideModal} >
                                &#x2716;
                            </Button>
                        </div>

                        <div className={classes.content}>

                            {/* provide modal state and state changers here */}
                            <ModalContext.Provider value={modalHandler}>
                                    {props.children}
                            </ModalContext.Provider>

                        </div>

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
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),

            // define grid
            display: "grid",
            gridTemplateRows: "repeat(1fr, 2fr, 1fr)",
            // gridTemplateColumns: "repeat(3, 1fr)",
        },
        closeDiv: {
            gridRow: "1/2",
        },
        closeX: {
            float: "right"
        },
        content: {
            gridRow: "2/3",
        },
    }),
);
