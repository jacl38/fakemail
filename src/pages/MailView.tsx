import { tw } from "../utility/tailwindUtil"
import MailViewHeader from "../components/MailViewHeader"
import MailItem from "../components/MailItem"

const styles = {
	outerContainer: tw(
		`h-full`,
		`overflow-hidden`,
	),
	mailList: {
		container: tw(
			`h-full overflow-y-scroll`,
			`space-y-2 p-4`
		)
	}
}

const MailView = () => {
	return <div className={styles.outerContainer}>

		<MailViewHeader />

		<div className={styles.mailList.container}>
			{[...Array(50)].map((_, i) => <MailItem id={i.toString()} />)}
		</div>

	</div>
}

export default MailView;