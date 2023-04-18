import { AdjustmentsHorizontalIcon, Cog6ToothIcon, EnvelopeIcon, MagnifyingGlassCircleIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { tw } from "../utility/tailwindUtil";
import { NavLink } from "react-router-dom";

const styles = {
	container: tw(
		`h-20 max-sm:h-[7rem] max-md:h-32 shrink-0`,
		`border-b-2`,
		`flex justify-between items-center max-md:items-start`,
		`py-2 px-4`,
		`bg-white`,
		`relative`,
		`transition-all duration-200`,
	),
	icon: {
		small: tw(`w-8`),
		medium: tw(`w-12`)
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
		)
	},
	items: {
		container: tw(
			`flex items-center`,
			`space-x-2`
		),
	},
	search: {
		container: tw(
			`absolute`,
			`sm:w-11/12 w-full max-sm:-bottom-6 max-md:-bottom-3 md:w-1/2`,
			`left-1/2 md:top-1/2 -translate-x-1/2 -translate-y-1/2`,
			`h-12`,
			`sm:rounded-full`,
			`flex`,
			`overflow-hidden`,
			`border-2`,
			`hover:shadow-md`,
			`transition-all duration-500`,
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

const PageHeader = () => {
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

export default PageHeader;