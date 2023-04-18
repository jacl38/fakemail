import { AdjustmentsHorizontalIcon, Cog6ToothIcon, EnvelopeIcon, MagnifyingGlassCircleIcon, MagnifyingGlassIcon, QueueListIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { tw } from "../utility/tailwindUtil";
import { NavLink } from "react-router-dom";

const styles = {
	container: tw(
		`h-20`,
		`border-b-2`,
		`flex justify-between relative`,
		`p-8`,
		`bg-white`
	),
	icon: {
		small: tw(`w-8`),
		medium: tw(`w-14`)
	},
	logo: {
		container: tw(
			`flex items-center justify-center`
		),
		link: tw(
			`flex items-center space-x-2`,
			`select-none`,
		),
		text: tw(
			`text-3xl font-light`,
			`max-md:hidden`
		)
	},
	items: {
		container: tw(
			`flex items-center`,
			`h-full`,
			`space-x-4`
		),
	},
	search: {
		container: tw(
			`absolute`,
			`max-w-[45%] min-w-[22rem] w-full`,
			`max-md:w-24 max-md:max-w-24`,
			`left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
			`h-12`,
			`rounded-full`,
			`flex`,
			`overflow-hidden`,
			`border-2`,
			`hover:shadow-md transition-shadow`,
			`divide-x-2`,
		),
		textBox: tw(
			`h-full`,
			`py-4 px-6`,
			`grow`,
		),
		button: {
			base: tw(
				`w-16`,
				`flex justify-center`,
				`group`,
				`hover:bg-neutral-100`,
				`transition-colors`,
				`text-neutral-400 hover:text-neutral-700`
			)
		}
	}
}

const Header = () => {
	return <header className={styles.container}>
		<div className={styles.logo.container}>

			<NavLink to="/" className={styles.logo.link}>
				<EnvelopeIcon className={tw(styles.icon.medium, "text-rose-700")} />
				<p className={styles.logo.text}>fak<span className="font-semibold">email</span></p>
			</NavLink>

		</div>
		<div className={styles.search.container}>

			<input placeholder="Search mail" className={styles.search.textBox} type="text" />

			<button className={styles.search.button.base}>
				<AdjustmentsHorizontalIcon className={tw(styles.icon.small)} />
			</button>
			<button className={styles.search.button.base}>
				<MagnifyingGlassCircleIcon className={tw(styles.icon.small)} />
			</button>
		</div>
		<div className={styles.items.container}>
			<Cog6ToothIcon className={tw(styles.icon.medium, "text-neutral-400")} />
			<UserCircleIcon className={tw(styles.icon.medium, "text-blue-600")} />
		</div>
	</header>
}

export default Header;