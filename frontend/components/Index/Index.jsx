import styled from "styled-components";
import Link from "next/link";

const Tagline = styled.h1`
	font-size: 4vw;
	@media (max-width: 900px) {
		font-size: 7vw;
	}
	@media (max-width: 550px) {
		font-size: 9vw;
	}
`;

const Img = styled.img`
	width: 100%;
	height: 100%;
`;

const TextButton = styled.p`
	padding: 0;
	margin: 0;
	font-size: 20px;
	@media (max-width: 470px) {
		font-size: 14px;
	}
	@media (max-width: 360px) {
		font-size: 10px;
	}
	@media (max-width: 320px) {
		font-size: 9px;
	}
`;

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
					<button className="btn btn-yellow">
						<TextButton>Set Time On/Off</TextButton>
					</button>
					<button className="btn btn-yellow">
						<TextButton>Set Brightness Lamp</TextButton>
					</button>
					<button className="btn btn-yellow">
						<TextButton>Set Sensor</TextButton>
					</button>
				</div>
			</div>
		</>
	);
}
