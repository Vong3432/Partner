import React, { Component } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { Container, Collapse, Navbar, NavLink, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

class TopNavbar extends Component {
    
    state = {
        isOpen: false,
        scrolling: false
    }    

    toggle = () => {
        this.setState({ isOpen: !this.state.isOpen })
    }     
    render() {        

        const activeStyle = {
            color: "#333333"
        }      
        
        const onScrollingStyle = {            
            background: "linear-gradient(180deg, #5B41FF 0%, #5135FB 100%)",            
            boxShadow: "0px 7px 15px rgba(0, 0, 0, 0.35)"
        }
        
        return (            
            <Navbar expand="lg" className="py-3" style={this.props.scrolling ? onScrollingStyle: null}>
                <Container className="align-items-end">
                    <NavbarBrand tag={RRNavLink} exact to="/" className="mr-md-auto">Partner.</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} className="mr-md-2 navbar-toggler">=</NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="ml-lg-3">
                            <NavItem>
                                <NavLink exact to="/" tag={RRNavLink} activeClassName="active">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/about" tag={RRNavLink} activeClassName="active">About</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/employee" tag={RRNavLink} activeClassName="active">Find jobs</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/employer" tag={RRNavLink} activeClassName="active">Hire employee</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav navbar className="ml-auto">
                            <div id="divider" className="d-lg-none mt-4 mb-3 mb-lg-0 mt-lg-0"></div>
                            <NavItem>
                                <NavLink to="/login" tag={RRNavLink} activeClassName="active" className="mr-md-2 my-2 my-md-0 no-styling-button">Sign In</NavLink>
                            </NavItem>                        
                            <NavItem>
                                <NavLink to="/register" tag={RRNavLink} activeClassName="active" className=" my-2 my-md-0 primary-button">Getting Started</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>   
                </Container>                                             
            </Navbar>
        )
    }
}

export default TopNavbar;

