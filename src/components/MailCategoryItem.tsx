import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { tw } from "../utility/tailwindUtil";

const styles = {
	outerContainer: tw(
		`min-w-[12rem]`,
		`whitespace-nowrap`,
		`px-2 pt-2`,
		`flex flex-col justify-between`
	),
	label: {
		container: tw(
			`flex items-center space-x-2`
		),
		icon: tw(
			`w-6 inline shrink-0`,
			`text-rose-700`
		),
		title: tw(
			`truncate`
		),
	}
}

const MailCategoryItem = () => {
	return <div className={styles.outerContainer}>
		<div className={styles.label.container}>
			<EnvelopeIcon className={styles.label.icon}/>
			<span className={styles.label.title}>Category Name the name of the category</span>
		</div>
		<div className="w-full bg-blue-200 h-1 rounded-t-full"></div>
	</div>
}

export default MailCategoryItem;