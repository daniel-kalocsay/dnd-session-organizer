import React from "react";
import { MDBBtn } from "mdbreact";
import RegisterModal from "./RegisterModal";

const Register = (props: any) => {

    return (
        <div>
            <MDBBtn onClick={props.show}> Register </MDBBtn>
            <RegisterModal open={props.open} show={props.show} hide={props.hide}/>
        </div>
    )
};

export default Register;