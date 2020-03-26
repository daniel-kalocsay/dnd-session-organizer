import React from "react";
import { Button } from "@material-ui/core";
import RegisterModal from "./RegisterModal";

const Register = (props: any) => {

    return (
        <div>
            <Button variant={"contained"}
                    color={"primary"}
                    onClick={props.show}
            >
                Register
            </Button>
            <RegisterModal open={props.open} show={props.show} hide={props.hide}/>
        </div>
    )
};

export default Register;
