import React from "react";
import { Button } from "@material-ui/core";
import LoginModal from "./LoginModal";

const Login = (props: any) => {

    return (
        <div>
            <Button variant={"contained"}
                    color={"primary"}
                    onClick={props.show}
            >
                Log in
            </Button>
            <LoginModal open={props.open} show={props.show} hide={props.hide} />
        </div>
    );
};

export default Login;
