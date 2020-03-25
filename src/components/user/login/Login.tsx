import React, {useContext, useState} from "react";
import {MDBBtn} from "mdbreact";
import LoginModal from "./LoginModal";

const Login = (props: any) => {

    return (
        <div>
            <MDBBtn onClick={props.show}>Login</MDBBtn>
            <LoginModal open={props.open} show={props.show} hide={props.hide} />
        </div>
    );
};

export default Login;
