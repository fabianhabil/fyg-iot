import Link from "next/link";
import styled from "styled-components";
import { useRouter } from "next/router";

const Nav = styled.nav`
    z-index: 1;
    .navbar-collapse {
        background-color: #fff;
        box-shadow: rgba(149, 157, 165, 0.2) 0 8px 24px;
    }
    @media (min-width: 992px) {
        .navbar-collapse {
            background-color: transparent;
            box-shadow: none;
        }
    }
`;

const Navbar = () => {
    const router = useRouter();

    return (
        <>
            <Nav className="navbar navbar-expand-lg navbar-light bg-transparent position-absolute w-100 mb-3 text-black">
                <div className="container">
                    <Link href="/">
                        <a className="navbar-brand fs-1" style={{ color: "#D79771" }}>
                            <img src="/logo.png"></img>
                        </a>
                    </Link>
                    {router.pathname != "/" && (
                        <>
                            <Link href="/">
                                <button className="btn btn-yellow-small">Back</button>
                            </Link>
                        </>
                    )}
                </div>
            </Nav>
        </>
    );
};

export default Navbar;
