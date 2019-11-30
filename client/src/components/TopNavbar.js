import React, { useEffect, useState } from 'react'
import { NavLink as RRNavLink } from 'react-router-dom'
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Container, Collapse, Navbar, NavLink, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';

import { connect, useSelector, useDispatch } from 'react-redux'
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

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)

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

            {user && user.category !== "ADMIN" && (
                <>
                    <NavItem>
                        {user && (
                            <NavLink className="mr-0 pr-0" style={{ color: "var(--primary-color)", opacity: "1" }} to={`/profile/${user.id}`} href={`/profile/${user.id}`} tag={RRNavLink} >{user ? `Welcome ${user.name}` : console.log(user)}</NavLink>
                        )}
                    </NavItem>
                    <NavItem>
                        <ButtonDropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
                            <DropdownToggle caret className="d-flex align-items-center" style={{ background: "transparent", border: "none", color: "var(--primary-color)", outline: "none", boxShadow: "none" }}></DropdownToggle>
                            <DropdownMenu>
                                {/* <DropdownItem header>Header</DropdownItem> */}
                                <DropdownItem>
                                    {user && (
                                        <NavLink tag={RRNavLink} className="px-0 text-black-50" style={{ opacity: "1" }} to={`/editProfile/${user.id}`} >
                                            Edit profile
                                </NavLink>
                                    )}
                                </DropdownItem>                                
                                <DropdownItem>
                                    {user && user.category === "employee" && (
                                        <NavLink className="px-0 text-black-50" style={{ color: "var(--dark-color)", opacity: "1" }} to={`/jobrequests`} tag={RRNavLink} >My Job Requests</NavLink>
                                    )}
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem><Logout /></DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>

                    </NavItem>
                </>
            )}

            {user && user.category === "ADMIN" && (
                <NavItem>
                    {user && (
                        <NavLink className="mr-0 pr-0" style={{ color: "var(--primary-color)", opacity: "1" }} to={`/admin/dashboard`} tag={RRNavLink} >{user ? `Welcome ${user.name}` : console.log(user)}</NavLink>
                    )}
                </NavItem>
            )}

        </div>
    )

    useEffect(() => {

    }, [isAuthenticated])

    return (
        <>
            {(!user || user.category !== "ADMIN") && (
                <>
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
                                        <NavLink to="/forum" tag={RRNavLink} activeClassName="active">Forum</NavLink>
                                    </NavItem>
                                </Nav>
                                <Nav navbar className="ml-auto">
                                    <div id="divider" className="d-lg-none mt-4 mb-3 mb-lg-0 mt-lg-0"></div>
                                    {isAuthenticated ? authLinks : guestLinks}
                                </Nav>
                            </Collapse>
                        </Container>
                    </Navbar>
                </>
            )}
        </>
    )


}

export default TopNavbar;

