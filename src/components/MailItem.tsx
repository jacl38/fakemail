import { NavLink } from "react-router-dom";
import { tw } from "../utility/tailwindUtil";
import { Email } from "../utility/storedTypes";
import { timeSpanToMilliseconds } from "../utility/mathUtils";
import { motion } from "framer-motion";
import { useEffect } from "react";

const styles = {
	container: tw(
		`w-full h-16 max-sm:h-18 rounded-3xl`,
		`block`,
		`border-2`,
		`hover:shadow-md`,
		`transition-shadow`,
		`flex items-stretch`,
		`divide-x-2`,
		`origin-left`
		// `animate-fadeIn`
	),
	items: {
		container: tw(
			`flex max-sm:flex-col`,
			`items-center justify-center`
		),
		button: tw(
			`sm:pl-6 sm:last-of-type:pr-4 h-full`,
			`max-sm:pl-6 max-sm:pr-5`,
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
			`mr-4`,
			`border-r-2`
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
			`flex items-center justify-center`,
			`shrink-0 w-16`,
		),
		date: tw(
			`font-bold text-xs whitespace-nowrap`
		)
	}
}

const MailItem = (props: Email & { index: number }) => {
	const mailDate = new Date(props.timestamp.valueOf());
	const mailAge = (new Date().valueOf() - mailDate.valueOf());

	// default: full mm/dd/yyyy date string
	let dateString = mailDate.toLocaleDateString(undefined, { dateStyle: "short" });
	
	// If the mail was received today
	if(mailDate.getDate() == new Date().getDate()) {
		dateString = mailDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
	} else {
		// If the mail was received within a week
		if(mailAge < timeSpanToMilliseconds({ weeks: 1 })) {
			dateString = mailDate.toLocaleDateString(undefined, { weekday: "short" })
		}
	}

	return <motion.div
		initial={{ scale: 0.9, opacity: 0, translateY: 20 }}
		whileInView={{ scale: 1, opacity: 1, translateY: 0, transition: { ease: "backOut" } }}
		exit={{ scale: 0.9, opacity: 0, translateX: -50 }}
		viewport={{ once: true }}
		className={styles.container}>
		<div className={styles.items.container}>

 			<label htmlFor={`selectEmailCheckbox-${props.id}`} className={styles.items.button}>
 				<input id={`selectEmailCheckbox-${props.id}`} className="cursor-pointer" type="checkbox" />
 			</label>

 			<label htmlFor={`starEmailCheckbox-${props.id}`} className={styles.items.button}>
 				<input id={`starEmailCheckbox-${props.id}`} className="cursor-pointer" type="checkbox" />
 			</label>
		</div>

		<NavLink to={`/mail?id=${props.id}`} className={styles.content.container}>
			<span className={styles.content.sender}>{props.sender.name}</span>
			<span className={styles.content.subject}>{props.subject}</span>
			<div className="collapse w-full"></div>
			<p className={styles.content.body}>{props.body}</p>
		</NavLink>
		
		<div className={styles.dateContent.container}>
			<p className={styles.dateContent.date}>{dateString}</p>
		</div>
	</motion.div>
}

export default MailItem;