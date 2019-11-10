import React, { useEffect, useState } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Collapse, Navbar, NavLink, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Logout from './auth/Logout'



const TopNavbar = (props) => {


    const onScrollingStyle = {
        boxShadow: "0px 7px 15px rgba(0, 0, 0, 0.05)"
    }

    const [isOpen, setIsOpen] = useState(false)
    const [dropdownOpen, setOpen] = useState(false);
    const [scrolling, setScrolling] = useState(false)

    TopNavbar.propTypes = {
        auth: PropTypes.object
    }

    const toggle = () => {
        // this.setState({ isOpen: !this.state.isOpen })
        setIsOpen(!isOpen);
    }

    const dropdownToggle = () => setOpen(!dropdownOpen);

    const { isAuthenticated, user } = props.auth

    const guestLinks = (
        <>
            <NavItem>
                <NavLink to="/login" tag={RRNavLink} activeClassName="active" className="mr-md-2 my-2 my-md-0 no-styling-button">Sign In</NavLink>
            </NavItem>
            <NavItem>
                <NavLink to="/register" tag={RRNavLink} activeClassName="active" className=" my-2 my-md-0 primary-button">Getting Started</NavLink>
            </NavItem>
        </>
    )

    const authLinks = (
        <div className="d-flex flex-row align-items-center">
            <NavItem>
                {props.auth.user && (
                    <NavLink className="mr-0 pr-0" style={{ color: "var(--primary-color)", opacity: "1" }} to={`/profile/${props.auth.user.id}`} tag={RRNavLink} >{user ? `Welcome ${user.name}` : console.log(user)}</NavLink>
                )}
            </NavItem>
            <NavItem>
                <ButtonDropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
                    <DropdownToggle caret className="d-flex align-items-center" style={{ background: "transparent", border: "none", color: "var(--primary-color)", outline: "none", boxShadow: "none" }}></DropdownToggle>
                    <DropdownMenu>
                        {/* <DropdownItem header>Header</DropdownItem> */}
                        <DropdownItem>
                            <NavLink className="px-0" style={{ opacity: "1" }} href="/">
                                Edit profile
                        </NavLink>
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem><Logout /></DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>

            </NavItem>
        </div>
    )

    useEffect(() => {

    }, [isAuthenticated])

    return (
        <Navbar expand="lg" className="py-3" style={props.scrolling ? onScrollingStyle : null}>
            <Container className="align-items-end">
                <NavbarBrand tag={RRNavLink} exact to="/" className="mr-md-auto">Partner.</NavbarBrand>
                <NavbarToggler onClick={toggle} className="mr-md-2 navbar-toggler">=</NavbarToggler>
                <Collapse isOpen={isOpen} navbar>
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
                        {isAuthenticated ? authLinks : guestLinks}
                    </Nav>
                </Collapse>
            </Container>
        </Navbar>
    )


}

function mapStateToProps(state) {
    return {
        auth: state.auth,
    }
}

export default connect(mapStateToProps, null)(TopNavbar);

