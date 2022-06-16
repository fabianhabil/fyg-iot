import Navbar from "./Navbar";
import Background from "./Background";
import Head from "next/head";

const Layout = ({ children }) => {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
				/>
				<title>FYG - IOT</title>
			</Head>
			<div>
				<Background />
				<Navbar />
				<div className="container">
					<main>{children}</main>
				</div>
			</div>
		</>
	);
};

export default Layout;
