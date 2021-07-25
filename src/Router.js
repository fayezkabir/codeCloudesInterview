import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";

// importing local files
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import HocExampleOne from "./pages/HocExampleOne";
import HocExampleTwo from "./pages/HocExampleTwo";

const AppWrapper = styled.div`
  max-width: 1170px;
  width: 100%;
  margin: 0 auto;
  min-height: 100vh;
  height : 100%;
//   padding: 0 16px;
  background-color : #f1f2f6;
  display : flex;
  justify-content : space-between;
  flex-direction: column;
  box-shadow: 1px 14px 10px 2px rgb(0 0 0 / 20%);
`;

const Routing = (_) => {
    return (
        <AppWrapper>
            <Helmet titleTemplate="%s - CC" defaultTitle="CC">
                <meta name="description" content="CC" />
            </Helmet>
            <Header />
            <Router>
                <Switch>
                    <Route exact component={Home} path="/" />
                    <Route exact component={HocExampleOne} path="/hoc/exampleone" />
                    <Route exact component={HocExampleTwo} path="/hoc/exampletwo" />
                </Switch>
            </Router>
            <Footer />
        </AppWrapper>
    )
}

export default Routing;