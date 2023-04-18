import { NavLink } from "react-router-dom";
import { tw } from "../utility/tailwindUtil";

const styles = {
	container: tw(
		`w-full h-16 rounded-full`,
		`block`,
		`border-2`,
		`hover:shadow-md`,
		`transition-all`,
		`flex items-stretch`,
		`overflow-hidden`,
		`divide-x-2`
	),
	items: {
		container: tw(
			`flex items-center`,
			`shrink-0`
		),
		button: tw(
			`w-16 h-full`,
			`cursor-pointer`,
			`flex items-center justify-center`
		)
	},
	from: {
		container: tw(
			`w-48`,
			`flex items-center`,
			`px-2`,
			`shrink-0`
		),
		label: tw(
			`font-bold truncate`
		)
	},
	mailContent: {
		container: tw(
			`grow`,
			`px-4 py-1`
		),
		subject: tw(
			`truncate font-bold text-lg`
		),
		body: tw(
			`truncate`,
			`text-sm`
		)
	}
}

const MailItem = (props: { id: string }) => {
	return <div className={styles.container}>
		<div className={styles.items.container}>

			<label htmlFor={`selectEmailCheckbox-${props.id}`} className={styles.items.button}>
				<input id={`selectEmailCheckbox-${props.id}`} className="cursor-pointer" type="checkbox" />
			</label>

			<label htmlFor={`starEmailCheckbox-${props.id}`} className={styles.items.button}>
				<input id={`starEmailCheckbox-${props.id}`} className="cursor-pointer" type="checkbox" />
			</label>

		</div>
		
		<div className={styles.from.container}>
			<p className={styles.from.label}>mail sender</p>
		</div>

		<div className={styles.mailContent.container}>
			<p className={styles.mailContent.subject}>mail subject</p>
			<p className={styles.mailContent.body}>mail body</p>
		</div>
	</div>
}

export default MailItem;