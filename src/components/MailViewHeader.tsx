import { NavLink } from "react-router-dom"
import { tw } from "../utility/tailwindUtil"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
import MailCategoryItem from "./MailCategoryItem"
import { Category, Email } from "../utility/storedTypes"
import { motion } from "framer-motion"
import { useContext } from "react"
import { MailContext } from "../main"

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
			`divide-x-2`,
			`group`
		),
		buttonBase: tw(
			`w-full`,
			`flex justify-center`
		),
		buttonEnabled: tw(
			`hover:bg-neutral-100 transition-colors`
		),
		buttonDisabled: tw(),
		iconBase: tw(
			`w-6 h-6`,
			`transition-colors`
		),
		iconEnabled: tw(
			`text-neutral-500 group-hover:text-neutral-700`,
		),
		iconDisabled: tw(
			`text-neutral-200`
		)
	}
}

const MailViewHeader = (props: {
	onSelect?: (id: string) => void,
	selectedCategory: string,
	selectedIndex: number,
	onPageChange?: (direction: number) => void
	selectedPage: number,
	pageCount: number,
	emailCount: number
}) => {
	const { emails, categories } = useContext(MailContext);

	const filteredEmails = (emails as Email[] ?? []).filter(email => email.categoryId == props.selectedCategory || props.selectedCategory == "all-mail");
	
	return <div className={styles.outerContainer}>

		<div>
			<label htmlFor="selectAllCheckbox" className={styles.checkBox.container}>
				<input id="selectAllCheckbox" type="checkbox" className={styles.checkBox.input} />
			</label>
		</div>

		<div className={styles.sectionSelector.container}>
			{(categories as Category[] ?? []).map((category, i) => <MailCategoryItem {...category} onSelect={props.onSelect}/>)}
			<motion.div layout
				style={{ left: props.selectedIndex * 192 }}
				transition={{ ease: "backOut" }}
				className="absolute w-48 h-full bg-black opacity-5 rounded-t-2xl top-1"></motion.div>
		</div>

		<div className={styles.pageLinks.outerContainer}>
			{props.selectedPage * 50 + 1}-{props.selectedPage * 50 + props.emailCount} / {filteredEmails.length}
			<div className={styles.pageLinks.iconContainer}>

				<button disabled={props.selectedPage == 0} className={tw(styles.pageLinks.buttonBase, props.selectedPage > 0 ? styles.pageLinks.buttonEnabled : styles.pageLinks.buttonDisabled)} onClick={() => props.onPageChange?.(-1)}>
					<ChevronLeftIcon className={tw(styles.pageLinks.iconBase, props.selectedPage > 0 ? styles.pageLinks.iconEnabled : styles.pageLinks.iconDisabled)} />
				</button>

				<button disabled={props.selectedPage >= props.pageCount - 1} className={tw(styles.pageLinks.buttonBase, props.selectedPage < props.pageCount - 1 ? styles.pageLinks.buttonEnabled : styles.pageLinks.buttonDisabled)} onClick={() => props.onPageChange?.(1)}>
					<ChevronRightIcon className={tw(styles.pageLinks.iconBase, props.selectedPage < props.pageCount - 1 ? styles.pageLinks.iconEnabled : styles.pageLinks.iconDisabled)} />
				</button>
				
			</div>
		</div>
	</div>
}

export default MailViewHeader;