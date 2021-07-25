import React from "react";

import withLanding from "../LandingHoc";


const ExampleTwo = (props) => {
    return (
        <p style={{textAlign : "center"}} >thats another page with HOC 🤩🤩🤩😋</p>
    )
}

export default withLanding(ExampleTwo);
