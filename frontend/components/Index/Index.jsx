import Link from "next/link";
import styled from "styled-components";
import { Tagline, Img, TextButton } from "../Micro/Micro";

export default function Home() {
    return (
        <>
            <div className="row min-vh-100 align-items-center text-black pt-md-2 pb-md-4">
                <div className="col-lg-6 col-12 mt-5">
                    <Img src="/homelogo.png" className="d-block ms-auto" alt="Scrolling" />
                </div>
                <div className="col-lg-6 col-12 px-5 d-flex flex-column align-items-center">
                    <Tagline>
                        Main <span style={{ color: "#ffb800" }}>Menu</span>
                    </Tagline>
                    <Link href="/lamp">
                        <button className="btn btn-yellow">
                            <TextButton>Turn On/Off Lamp</TextButton>
                        </button>
                    </Link>
                    <Link href="/sensor">
                        <button className="btn btn-yellow">
                            <TextButton>Set Sensor</TextButton>
                        </button>
                    </Link>
                    <Link href="/brightness">
                        <button className="btn btn-yellow">
                            <TextButton>Set Brightness Lamp</TextButton>
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}
