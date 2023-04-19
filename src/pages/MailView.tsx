import { tw } from "../utility/tailwindUtil"
import MailViewHeader from "../components/MailViewHeader"
import MailItem from "../components/MailItem"
import useLocalStorage from "../hooks/useLocalStorage"
import { Email } from "../utility/storedTypes"
import { useState } from "react"

const styles = {
	outerContainer: tw(
		`flex flex-col h-full`
	),
	mailList: {
		container: tw(
			`py-4 px-2.5 space-y-2`,
			`overflow-y-scroll`
		)
	}
}

const MailView = () => {
	const [category, setCategory] = useState("all-mail");
	const [emails, setEmails] = useLocalStorage("emails", []);

	return <div className={styles.outerContainer}>

		<MailViewHeader />

		<div className={styles.mailList.container}>
			{(emails as Email[] ?? []).map((email, i) => <MailItem {...email}/>)}
			{/* {[...Array(50)].map((_, i) => <MailItem id={i.toString()} />)} */}
		</div>

	</div>
}

export default MailView;