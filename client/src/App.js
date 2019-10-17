import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import TopNavbar from './components/TopNavbar'
import Main from './pages/Main';
import SignUpLayout from './pages/SignUpLayout'
import SignInLayout from './pages/SignInLayout'
import { Container } from 'reactstrap'
import About from './pages/About';

function App() {  

  return (
    <div className="App">      
      <Router>
        <TopNavbar />
        <Switch>
          <>
          <Container className="my-3">
            <Route path="/" exact component={Main} />
            <Route path="/about" exact component={About} />
            <Route path="/register" exact component={SignUpLayout} />
            <Route path="/login" exact component={SignInLayout} />  
          </Container>          
          </>
        </Switch>        
      </Router>      
    </div>
  );
}

export default App;
