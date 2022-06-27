import React, { useEffect } from "react";
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logout(userInfo.email, userInfo.name));
    };

    useEffect(() => {}, [userInfo]);

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
                {userInfo ? (
                    <Link to="/home"><Navbar.Brand>Beranda</Navbar.Brand></Link>
                ) : (
                    <Link to="/"><Navbar.Brand>Beranda</Navbar.Brand></Link>
                )}
                {userInfo ? (
                    <>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-end">
                        <Nav navbarScroll>
                            <NavDropdown title={`${userInfo.name}`} id="navbarScrollingDropdown" className="justify-content-end">
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Keluar
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                    </>
                ) : (
                    <Nav.Link href="/login">Login</Nav.Link>
                )}
            </Container>
        </Navbar>
    );
}

export default Header;