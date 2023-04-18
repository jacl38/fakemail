import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Layout = () => {
	return <main className="h-full flex flex-col">
		<Header />
		<Outlet />
	</main>
}

export default Layout;