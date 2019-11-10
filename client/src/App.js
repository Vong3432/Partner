import React, {useEffect, useState} from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

// import reactstrap
import { Container } from 'reactstrap'

// import components
import TopNavbar from './components/TopNavbar'

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

import { Provider } from 'react-redux'
import store from './store'
import axios from 'axios'
import EmployerTable from './components/user/EmployerTable';
import { Messages } from './components/user/Messages';

function App() {  

  const [isScrollingDown, setIsScrollDown] = useState(false);  
  
  
  let flag;
  useEffect(() => {      
    document.addEventListener('scroll', handleScroll)    
    return(()=> document.removeEventListener('scroll', handleScroll))

  },[])


  const handleScroll = ()=>{

    let newFlag = (window.scrollY > 30);
    if(flag !== newFlag)
    {      
      setIsScrollDown(newFlag)
      flag = newFlag;      
    }
    else
    {
      setIsScrollDown(newFlag)     
      flag = newFlag;      
    }
    
  }
    
  return (
    <Provider store={store}>
      <div className="App">      
        <Router>
          <TopNavbar scrolling={isScrollingDown} />
          <Switch>
            <>
            <Container className="my-3">
              <Route path="/" exact component={Main} />
              <Route path="/about" exact component={About} />
              <Route path="/employee" exact component={Job} />
              <Route path="/register" exact component={SignUpLayout} />
              <Route path="/login" exact component={SignInLayout} />  
              <Route path="/addJob" exact component={AddJobPage} />  
              <Route path="/profile" exact component={Profile} />  
              <Route path="/profile/employertable" exact component={EmployerTable} />  
              <Route path="/profile/messages" exact component={Messages} />  
              <Route path="/resume" exact component={Resume} />
            </Container>          
            </>
          </Switch>        
        </Router>       
      </div>
    </Provider>
  );
}

export default App;
