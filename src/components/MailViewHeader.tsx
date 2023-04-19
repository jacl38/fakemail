import { NavLink } from "react-router-dom"
import { tw } from "../utility/tailwindUtil"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import MailCategoryItem from "./MailCategoryItem"
import useLocalStorage from "../hooks/useLocalStorage"
import { Category } from "../utility/storedTypes"

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
			`h-16`,
			`2xl:w-[74rem] xl:w-[60rem] lg:w-[42rem] md:w-[27rem] sm:w-7/12 max-sm:w-2/5`,
			`transition-all`,
			`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
			`flex items-stretch`,
			`overflow-x-scroll overflow-y-hidden`,
		)
	},
	pageLinks: {
		outerContainer: tw(
			`flex flex-col items-center`,
			`h-full justify-center`,
			`text-sm`
		),
		iconContainer: tw(
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
			`w-6 h-6`,
			`transition-colors`
		)
	}
}

const MailViewHeader = (props: { selectedCategory: string, onSelect?: (id: string) => void }) => {
	const [categories, setCategories] = useLocalStorage("categories", []);
	const [emails, setEmails] = useLocalStorage("emails", []);

	return <div className={styles.outerContainer}>

		<div>
			<label htmlFor="selectAllCheckbox" className={styles.checkBox.container}>
				<input id="selectAllCheckbox" type="checkbox" className={styles.checkBox.input} />
			</label>
		</div>

		<div className={styles.sectionSelector.container}>
			{(categories as Category[] ?? []).map((category, i) => <MailCategoryItem {...category} onSelect={props.onSelect}/>)}
		</div>

		<div className={styles.pageLinks.outerContainer}>
			1-{Math.min(emails?.length, 50)} / {emails?.length}
			<div className={styles.pageLinks.iconContainer}>
				<NavLink className={styles.pageLinks.link} to="/"><ChevronLeftIcon className={styles.pageLinks.icon} /></NavLink>
				<NavLink className={styles.pageLinks.link} to="/"><ChevronRightIcon className={styles.pageLinks.icon} /></NavLink>
			</div>
		</div>
	</div>
}

export default MailViewHeader;