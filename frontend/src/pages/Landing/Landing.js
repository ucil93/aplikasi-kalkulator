import React, { useEffect } from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import './Landing.css'

const Landing = () => {
    const userLogin = useSelector((state) => state.userLogin);
    const navigate = useNavigate();
    const { userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate("/home");
        }
    });

  return (
    <div className="main">
        <Container>
            <Row>
                <div className="judul-landing">
                    <div>
                        <h1 className="text-judul">Aplikasi Kalkulator</h1>
                    </div>
                    <div className="button-landing">
                        <Link to="/login">
                            <Button size="lg" className="isi-button">
                                Login
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button variant="outline-primary" size="lg" className="isi-button" >
                                Daftar
                            </Button>
                        </Link>
                    </div>
                </div>
            </Row>
        </Container>
    </div>
  );
}

export default Landing;