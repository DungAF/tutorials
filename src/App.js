import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Navbar, Container, Nav, Alert,   NavDropdown } from 'react-bootstrap'
import logo from './logo.svg'

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import GoogleButton from 'react-google-button'

import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

import { useTranslation } from 'react-i18next'
import { MDBIcon } from 'mdb-react-ui-kit';
import i18next from 'i18next';


const clientId = "113954891584-jrnmnoq40u8gcaj7nple830ms0npgqod.apps.googleusercontent.com";
const languages = [
  {
      code : 'en',
      name : 'English',
      country : 'united-kingdom',
  },
  {
      code : 'fr',
      name : 'Japan',
      country : 'japan',
  },
]

function App () {
  const [isLogin,setIsLogin] = useState(false)
  const { t } = useTranslation()

  const onLoginSuccess = (res) => {
    console.log('Login Success:', res.profileObj);
    setIsLogin(true)
  };

  const onLoginFailure = (res) => {
    console.log('Login Failed:', res);
  };

  const onSignoutSuccess = () => {
    alert("You have been logged out successfully");
    console.clear();
    setIsLogin(false)
  };

  return(
    <div>
      { isLogin ?
        <div>
        <GoogleLogout
          clientId={clientId}
          buttonText="Sign Out"
          onLogoutSuccess={onSignoutSuccess}
          render={renderProps => (
            <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">
                <img
                  alt=""
                  src={logo}
                  width="60"
                  height="60"
                  className="d-inline-block align-top"
                />{' '}
              {t("React_Tutorials")}
              </Navbar.Brand>
              <Nav >
                <NavDropdown title={t('language')} id="basic-nav-dropdown">
                  {languages.map((lan)=>(
                    <NavDropdown.Item onSelect={() => i18next.changeLanguage(lan.code)}><MDBIcon flag={lan.country} />{lan.name}</NavDropdown.Item>
                  ))}
                </NavDropdown>
                <Nav.Link onClick={renderProps.onClick} disabled={renderProps.disabled}>{t("Sign_Out")}</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
          )}
        >
        </GoogleLogout>
          <Router>
          <Switch>
              <Route exact path="/" component={TutorialsList} />
              <Route exact path="/tutorials/:id" component={Tutorial} />
          </Switch>
          </Router>
        </div>
        : 
        <GoogleLogin
          clientId={clientId}
          buttonText="Sign In"
          onSuccess={onLoginSuccess}
          onFailure={onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
          render={renderProps => (
            <div style={{textAlign:"center"}}>
            <Alert variant="primary" style={{margin:"10% auto",width:"500px",height:"300px",textAlign:"center"}}>
              <h2 style={{marginTop:"50px",marginBottom:"40px"}}>Wellcom to Tutorials</h2>
                <GoogleButton
                onClick={renderProps.onClick} disabled={renderProps.disabled}
                style={{display:"inline-block",marginBottom:"auto"}}
                />
            </Alert>
            </div>
          )}
        > 
        </GoogleLogin>
        } 
    </div>
  );
}

export default App;

