import React, { useEffect, useState } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import ExternalApi from "./views/ExternalApi";
import { useAuth0 } from "@auth0/auth0-react";
import history from "./utils/history";
// import { updateCustomComponents } from "./feature/customComponent";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
import OTP from "./components/otp";
import Tokens from "./components/Tokens";
import OTPFill from "./components/OTPFill";
import ID from "./components/ID";
import Access from "./components/Access";
import Refresh from "./components/Refresh";
// import { useDispatch } from "react-redux";
import axios from "axios";

initFontAwesome();

const App = (props) => {
  useEffect(() => {
    const loadFont = async (fontFamily) => {
      const resp = await axios.get(
        "https://fonts.googleapis.com/css2?family=Babylonica&display=swap"
      );
      console.log(resp);
      const font = new FontFace(fontFamily, resp);
      console.log("------------Able to set custom fonts----------");
      // add font to document
      document.fonts.add(font);
      // enable font with CSS class
      document.body.style.fontFamily = fontFamily;
    };
    loadFont("'Babylonica', cursive").catch((e) => {
      console.log(e);
    });
  }, []);
  // document.getElementById("root").style.fontFamily =
  //   "Impact,Charcoal,sans-serif";
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   function loadError(oError) {
  //     throw new URIError(
  //       "The script " + oError.target.src + " didn't load correctly."
  //     );
  //   }
  //   const event = new Event("customHeaderLoaded");

  //   function affixScriptToHead(url, onloadFunction) {
  //     var newScript = document.createElement("script");
  //     newScript.onerror = loadError;
  //     if (onloadFunction) {
  //       newScript.onload = onloadFunction;
  //     }
  //     document.head.appendChild(newScript);
  //     newScript.src = url;
  //   }
  //   affixScriptToHead(
  //     "https://cdn.jsdelivr.net/gh/atulrana007/latest-auth0-code/dist/bundleCustomComponents_0_0_3.min.js",
  //     function () {
  //       console.log(
  //         "three",
  //         window.customHeader,
  //         window.customFooter,
  //         window.customLeftContainer
  //       );
  //       dispatch(
  //         updateCustomComponents({
  //           customFooter: window.customFooter,
  //           customHeader: window.customHeader,
  //           customLeftContainer: window.customLeftContainer,
  //         })
  //       );
  //       // dispatch(
  //       //   updateCustomComponents({
  //       //     customFooter: null,
  //       //     customHeader: null,
  //       //     customLeftContainer: null,
  //       //   })
  //       // );
  //       window.dispatchEvent(event);
  //       // alert("script loaded");
  //     }
  //   );
  // }, []);
  const { customHeader } = props;
  console.log("customHeader in app", customHeader);
  const [detailsState, setDetailsState] = useState({
    email: "",
    otp: "",
    accessToken: "",
    idToken: "",
    refreshToken: "",
  });
  const { isLoading, error } = useAuth0();

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={() => Home()} />
            <Route path="/profile" component={Profile} />
            <Route path="/external-api" component={ExternalApi} />
            <Route path="/otp" exact>
              <OTP
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/verify" exact>
              <OTPFill
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/token" exact>
              <Tokens
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseAccessToken" exact>
              <Access
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseIDToken" exact>
              <ID
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
            <Route path="/parseRefreshToken" exact>
              <Refresh
                detailsState={detailsState}
                setDetailsState={setDetailsState}
              />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
