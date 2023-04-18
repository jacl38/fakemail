import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { tw } from "../utility/tailwindUtil";

const styles = {
	outerContainer: tw(
		`h-full`,
		`flex flex-col`
	),
	contentContainer: tw(
		`w-full h-full p-4`,
		`bg-neutral-100`
	),
	outletContainer: tw(
		`w-full h-full`,
		`rounded-2xl overflow-hidden`,
		`bg-white`,
		`border-2`,
		`shadow-md`
	)
}

const Layout = () => {
	return <main className={styles.outerContainer}>
		<Header />
		<div className={styles.contentContainer}>
			<div className={styles.outletContainer}>
				<Outlet />
			</div>
		</div>
	</main>
}

export default Layout;