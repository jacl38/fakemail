import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { tw } from "../utility/tailwindUtil";

const styles = {
	outerContainer: tw(
		`w-full h-full`,
		`flex flex-col`,
		`bg-neutral-100`
	),
	contentContainer: tw(
		`p-8 h-[calc(100vh-5rem)] max-md:h-[calc(100vh-10rem)]`
	),
	outletContainer: tw(
		`h-full overflow-hidden`,
		`rounded-3xl`,
		`flex flex-col`,
		`bg-white border-2 shadow-md`
	)
}

const Layout = () => {
	return <div className={styles.outerContainer}>
		<PageHeader />
		<div className={styles.contentContainer}>
			<div className={styles.outletContainer}>
				<Outlet />
			</div>
		</div>
	</div>
}

export default Layout;