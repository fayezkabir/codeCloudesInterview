import React from "react";
import styled from "styled-components";

import { useHistory, useLocation } from "react-router";

const FlexWrapper = styled.div`
    display: flex;
    height: 100vh;
    .nav-bar {
        flex-basis: 30%;
        box-shadow: 0px 0px 10px 2px rgb(0 0 0 / 20%);
        height: 100%;
        > ul {
            padding: 0;
            margin: 0;
            > li {
            list-style: none;
            padding: 6px 12px;
            background-color: #a29bfe;
            margin-bottom: 5px;
            cursor: pointer;
        }

        } 
    };
    .land {
        flex-basis: 70%;
    };
    .active {
            border: 1px solid #2c3e50;
    }
`;

const withLanding = LandingComp => (props) => {
    const history = useHistory();
    const location = useLocation();
    
    const gotoPage= route => {
        history.push(route);
    }
    
    return (
        <FlexWrapper>
            <div className="nav-bar">
                <ul>
                    <li className={location.pathname === "/hoc/exampleone" ? 'active' : ""} onClick={() => gotoPage("/hoc/exampleone")}>example one</li>
                    <li className={location.pathname === "/hoc/exampletwo" ? 'active' : ""} onClick={() => gotoPage("/hoc/exampletwo")}>example two</li>
                    <li onClick={() => gotoPage("/")}>home</li>
                </ul>
            </div>
            <div className="land">
                <LandingComp {...props} />
            </div>
        </FlexWrapper>
    )

}

export default withLanding;