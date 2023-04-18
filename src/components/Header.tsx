import { Cog6ToothIcon, EnvelopeIcon } from "@heroicons/react/24/solid";
import { tw } from "../utility/tailwindUtil";
import { NavLink } from "react-router-dom";

const styles = {
	container: tw(
		`h-20`,
		`border-b-2`,
		`flex justify-between relative`,
		`p-8`
	),
	logoContainer: tw(
		`flex items-center justify-center`
	),
	itemsContainer: tw(
		`flex items-center flex-row-reverse`,
		`h-full`
	)
}

const Header = () => {
	return <header className={styles.container}>
		<div className={styles.logoContainer}>
			<NavLink to="/" className="flex items-center text-3xl space-x-2 font-light">
				<EnvelopeIcon className="w-16" />
				<p>fak<span className="font-semibold">email</span></p>
			</NavLink>
		</div>
		<div className="absolute max-w-[50%] min-w-[24rem] w-full bg-green-200 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded-full">
			search
		</div>
		<div className={styles.itemsContainer}>
			<Cog6ToothIcon className="text-blue-500 w-16" />
		</div>
	</header>
}

export default Header;