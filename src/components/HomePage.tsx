import React from "react";
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h2>Hello world!</h2>

            <Link to={"/combat"}>Check out our combat grid!</Link>
        </div>
    )
};

export default HomePage;