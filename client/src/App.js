import React, { useEffect, useState } from 'react';
import './App.css';
//import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// import reactstrap
import { Container } from 'reactstrap'

// import components
import TopNavbar from './components/TopNavbar'
import EmployerTable from './components/user/EmployerTable';
import { Messages } from './components/user/Messages';


// import pages
import Main from './pages/Main';
import SignUpLayout from './pages/auth/SignUpLayout'
import SignInLayout from './pages/auth/SignInLayout'
import About from './pages/About';
import Job from './pages/job/Job';


//import {JobProvider} from './JobContext'
import AddJobPage from './pages/job/AddJobPage';
import Profile from './pages/user/Profile';
import Resume from './pages/user/Resume';
import EditProfile from './pages/user/EditProfile';

import { Provider } from 'react-redux'
import store from './store'
import axios from 'axios'
import AdminRouter from './components/admin/AdminRouter';
import Forum from './pages/Forum';

// alert
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import AllPagePreview from './components/job/AllPagePreview';
import { PreviewProvider } from './PreviewContext';
import Request from './pages/user/Request'
import Join from './pages/user/Join';
import Chat from './pages/user/Chat';

function App() {

  const [isScrollingDown, setIsScrollDown] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false)
  const [show, setShow] = useState(true)

  // I will update this app

  let flag;
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return (() => document.removeEventListener('scroll', handleScroll))

  }, [])


  const handleScroll = () => {

    let newFlag = (window.scrollY > 30);
    if (flag !== newFlag) {
      setIsScrollDown(newFlag)
      flag = newFlag;
    }
    else {
      setIsScrollDown(newFlag)
      flag = newFlag;
    }

  }

  // optional cofiguration
  const options = {
    // you can also just use 'bottom center'
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '30px',
    // you can also just use 'scale'
    transition: transitions.SCALE
  }

  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <TopNavbar scrolling={isScrollingDown} />
            <Switch>
              <>
                <Container className="my-3">
                  <Route path="/" exact component={Main} />
                  <Route path="/about" exact component={About} />
                  
                  <Route path="/forum" exact component={Forum} />
                  <Route path="/register" exact component={SignUpLayout} />
                  <Route path="/login" exact component={SignInLayout} />
                  <Route path="/addJob" exact component={AddJobPage} />
                  <Route path="/profile/:id" exact component={Profile} />
                  <Route path="/editProfile/:id" exact component={EditProfile} />
                  <Route path="/profile/employertable/:id" exact component={EmployerTable} />
                  <Route path="/profile/messages" exact component={Messages} />
                  <Route path="/resume" exact component={Resume} />
                  <Route path="/admin" component={AdminRouter} />
                  <Route path="/jobrequests" exact component={Request}/>
                  <Route path="/join/:id" component={Join} />
                  <Route path="/chat" component={Chat} />
                  <PreviewProvider>
                    <Route path="/employee" exact component={Job} />
                    <Route path="/job/previewall/:jobid" exact component={AllPagePreview} />
                  </PreviewProvider>                  
                </Container>
              </>
            </Switch>
          </Router>
        </div>
      </Provider>
    </AlertProvider>
  );
}

export default App;
