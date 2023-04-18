import { NavLink } from "react-router-dom"
import { tw } from "../utility/tailwindUtil"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"

const styles = {
	outerContainer: tw(
		`h-16 shrink-0`,
		`flex justify-between items-center`,
		`px-6`,
		`shadow-md`,
		`relative`
	),
	checkBox: {
		container: tw(
			`w-8 h-8`,
			`flex justify-center items-center`,
			`cursor-pointer`
		),
		input: tw(
			`cursor-pointer`
		)
	},
	sectionSelector: {
		container: tw(
			`bg-blue-500`,
			`h-16`,
			`2xl:w-[74rem] xl:w-[60rem] lg:w-[42rem] md:w-[27rem] sm:w-7/12 max-sm:w-2/5`,
			`transition-all`,
			`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
			`flex items-stretch`,
			`overflow-x-scroll overflow-y-hidden`
		)
	},
	pageLinks: {
		container: tw(
			`w-20`,
			`rounded-full`,
			`border-2`,
			`flex justify-stretch`,
			`overflow-hidden`,
			`divide-x-2`
		),
		link: tw(
			`w-full`,
			`flex justify-center`,
			`hover:bg-neutral-100 transition-colors`
		),
		icon: tw(
			`text-neutral-400 hover:text-neutral-700`,
			`w-8 h-8`,
			`transition-colors`
		)
	}
}

const MailViewHeader = () => {
	return <div className={styles.outerContainer}>

		<div>
			<label htmlFor="selectAllCheckbox" className={styles.checkBox.container}>
				<input id="selectAllCheckbox" type="checkbox" className={styles.checkBox.input} />
			</label>
		</div>

		<div className={styles.sectionSelector.container}>
			{[...Array(50)].map((_, i) => <p className="min-w-[12rem] bg-red-500">item {i}</p>)}
		</div>

		<div className={styles.pageLinks.container}>
			<NavLink className={styles.pageLinks.link} to="/"><ChevronLeftIcon className={styles.pageLinks.icon} /></NavLink>
			<NavLink className={styles.pageLinks.link} to="/"><ChevronRightIcon className={styles.pageLinks.icon} /></NavLink>
		</div>
	</div>
}

export default MailViewHeader;