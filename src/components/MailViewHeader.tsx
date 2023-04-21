import { NavLink } from "react-router-dom"
import { tw } from "../utility/tailwindUtil"
import { ArrowDownOnSquareStackIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid"
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
	// checkBox: {
	// 	container: tw(
	// 		`w-8 h-8`,
	// 		`flex justify-center items-center`,
	// 		`cursor-pointer`
	// 	),
	// 	input: tw(
	// 		`cursor-pointer`
	// 	)
	// },
	deleteButton: {
		container: tw(
			// `bg-red-500`,
			`px-2 h-8`,
			`rounded-full overflow-hidden`,
			`text-right`,
			// `font-semibold text-white`,
			`font-semibold border-2 border-red-500`,
			`hover:bg-red-200 transition-colors`
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
	selectedCategoryIndex: number,
	onPageChange?: (direction: number) => void
	selectedPage: number,
	pageCount: number,
	emailCount: number,
	selectedIDS: number[]
}) => {
	const { emails, categories } = useContext(MailContext);

	const filteredEmails = (emails as Email[] ?? []).filter(email => email.categoryId == props.selectedCategory || props.selectedCategory == "all-mail");
	
	return <div className={styles.outerContainer}>

		<div>
			{
				props.selectedIDS.length > 0
				&& <motion.button
					layout
					initial="rest"
					whileHover="hover"
					variants={{
						rest: {
							width: "2rem",
							justifyItems: "center"
						},
						hover: {
							width: "5.5rem",
							justifyItems: "right"
						},
					}}
					className={styles.deleteButton.container}
				>
					<motion.span
						className="overflow-hidden absolute left-8"
						variants={{
							rest: {
								width: 0,
								translateY: "20%",
								opacity: 0
							},
							hover: {
								width: "auto",
								translateY: 0,
								opacity: 1
							}
						}}
					>
						Delete
					</motion.span>
					<span className="text-center mr-0.5">{props.selectedIDS.length}</span>
				</motion.button>
			}
		</div>

		<div className={styles.sectionSelector.container}>
			{(categories as Category[] ?? []).map((category, i) => <MailCategoryItem {...category} onSelect={props.onSelect}/>)}
			<motion.div layout
				style={{ left: props.selectedCategoryIndex * 192 }}
				transition={{ ease: "backOut" }}
				className="absolute w-48 h-full bg-black opacity-5 rounded-t-2xl top-1"></motion.div>
		</div>

		<div className={styles.pageLinks.outerContainer}>
			{
				props.emailCount > 0
					? <>{props.selectedPage * 50 + 1}-{props.selectedPage * 50 + props.emailCount} / {filteredEmails.length}</>
					: <>No mail</>
			}
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