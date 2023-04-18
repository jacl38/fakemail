import { NavLink } from "react-router-dom";
import { tw } from "../utility/tailwindUtil";

const styles = {
	container: tw(
		`w-full h-16 max-sm:h-18 rounded-3xl`,
		`block`,
		`border-2`,
		`hover:shadow-md`,
		`transition-all`,
		`flex items-stretch`,
		`divide-x-2`,
	),
	items: {
		container: tw(
			`flex max-sm:flex-col`,
			`items-center justify-center`,
			`pl-3.5 pr-2`
		),
		button: tw(
			`w-8 h-8`,
			`cursor-pointer`,
			`flex items-center justify-center`
		)
	},
	content: {
		container: tw(
			`w-0 grow`,
			`px-2`,
			`flex flex-wrap h-full items-center`,
		),
		sender: tw(
			`sm:w-36 w-24`,
			`font-bold`,
			`truncate`,
			`mr-4`
		),
		subject: tw(
			`grow w-0`,
			`truncate`,
			`font-semibold`,
		),
		body: tw(
			`w-full`,
			`truncate`,
			`text-neutral-500`
		)
	},
	dateContent: {
		container: tw(
			`flex items-center shrink-0`,
			`px-1.5`
		),
		date: tw(
			`font-bold tracking-tight text-xs`
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

		<NavLink to="/" className={styles.content.container}>
			<span className={styles.content.sender}>the sender of the email</span>
			<span className={styles.content.subject}>the subject of the email that was received the subject of the email that was received</span>
			<div className="collapse w-full"></div>
			<p className={styles.content.body}>{"body ".repeat(20)}</p>
		</NavLink>
		
		<div className={styles.dateContent.container}>
			<p className={styles.dateContent.date}>{new Date().toLocaleString(undefined, { month: "short", day: "numeric" })}</p>
		</div>
	</div>
}

export default MailItem;