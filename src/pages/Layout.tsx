import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { tw } from "../utility/tailwindUtil";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect } from "react";
import { Category } from "../utility/storedTypes";
import { StarIcon } from "@heroicons/react/24/solid";

const styles = {
	outerContainer: tw(
		`w-full h-full`,
		`flex flex-col`,
		`bg-neutral-100`
	),
	contentContainer: tw(
		`sm:p-8 h-[calc(100vh-5rem)] max-sm:h-[calc(100vh-7rem)] max-md:h-[calc(100vh-8rem)]`,
		`transition-all`
	),
	outletContainer: tw(
		`h-full`,
		`sm:rounded-3xl`,
		`flex flex-col`,
		`bg-white sm:border-2 shadow-md`,
		`overflow-hidden`,
		`transition-all`
	)
}

const Layout = () => {
	const [initialSetup, setInitialSetup] = useLocalStorage("initial-setup", false);
	const [categories, setCategories] = useLocalStorage("categories", []);

	useEffect(() => {
		console.log(`Initial setup value: ${initialSetup}`);
		if(initialSetup == undefined) return;
		
		if(!initialSetup) {
			setCategories([
				{ label: "All mail", color: "#be123c", icon: "envelope" },
				{ label: "Starred", color: "#fbbf24", icon: "star" },
				{ label: "Drafts", color: "#475569", icon: "pencil" }
			] as Category[]);
			location.reload();
		}
		setInitialSetup(true);
	}, [initialSetup]);

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