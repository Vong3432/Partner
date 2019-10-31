import React, {useEffect, useState, useCallback} from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

// import reactstrap
import { Container } from 'reactstrap'

// import components
import TopNavbar from './components/TopNavbar'

// import pages
import Main from './pages/Main';
import SignUpLayout from './pages/SignUpLayout'
import SignInLayout from './pages/SignInLayout'
import About from './pages/About';
import Job from './pages/Job';

import {JobProvider} from './JobContext'

function App() {  

  const [isScrollingDown, setIsScrollDown] = useState(false);
  
  let flag;
  useEffect(() => {      
    document.addEventListener('scroll', handleScroll)    
    return(()=> document.removeEventListener('scroll', handleScroll))
  },[])

  const handleScroll = useCallback(()=>{

    let newFlag = (window.scrollY > 50);
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
    
  }, [isScrollingDown]) 
    
  return (
    <div className="App">
      <JobProvider>
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
            </Container>          
            </>
          </Switch>        
        </Router> 
      </JobProvider>           
    </div>
  );
}

export default App;
