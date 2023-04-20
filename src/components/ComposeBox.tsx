import { PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { tw } from "../utility/tailwindUtil";
import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { MailContext } from "../main";
import { Email } from "../utility/storedTypes";

const styles = {
	outerContainer: tw(
		`fixed inset-0`,
		`bg-[#ffffff80]`,
		`backdrop-blur-[2px] backdrop-brightness-75`,
		`z-40`
	),
	innerContainer: tw(
		`fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2`,
		`bg-white border-2`,
		`rounded-3xl overflow-hidden`,
		`shadow-xl`,
		`transition-[width,height]`,
		`flex flex-col items-stretch`,
		`z-50`,
		`w-[calc(100%-2rem)] sm:w-[calc(100%-8rem)] min-h-[12rem] h-3/4`,
	),
	inputBar: tw(
		`w-full bg-neutral-100`,
		`py-3 px-5`,
		`border-b-2`
	),
	textBox: tw(
		`resize-none`,
		`w-full grow`,
		`p-2`
	),
	controls: {
		container: tw(
			`flex items-center h-16`,
			`px-3`,
			`bg-neutral-100`,
		),
		icon: {
			small: tw("w-6 h-6"),
			medium: tw("w-8 h-8")
		},
		buttons: {
			base: tw(
				`flex items-center`,
				`px-4`,
				`h-2/3`,
				`rounded-3xl rounded-l-lg`,
				`border-l-8 border-sky-700 border-double`,
				`text-lg font-bold`,
				`origin-right`
			),
			send: tw(
				`bg-gradient-to-br from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500`,
				`text-white`,
			),
			exit: tw(
				`w-16 flex items-center justify-center`,
				`bg-neutral-100 hover:bg-neutral-200`,
				`transition-colors`,
				`text-neutral-400 hover:text-neutral-500`
			)
		}
	},
}

const ComposeBox = (props: { onClose?: () => void }) => {
	const { emails, setEmails } = useContext(MailContext);

	const toField = useRef<HTMLInputElement>(null);
	const subjectField = useRef<HTMLInputElement>(null);
	const textField = useRef<HTMLTextAreaElement>(null);

	const sendEmail = () => {
		const highestEmailID = emails.sort((a, b) => b.id - a.id)[0].id ?? 0;
		const newEmail: Email = {
			id: highestEmailID + 1,
			sender: { address: "me@fakemail.jclark.space", name: "Me" },
			subject: subjectField.current?.value ?? "",
			body: textField.current?.value ?? "",
			categoryId: "sent",
			timestamp: Date.now()
		}
		setEmails([...emails, newEmail]);
	}

	return <motion.div
		onClick={e => props.onClose?.()}
		initial={{ opacity: 0 }}
		animate={{ opacity: 1 }}
		exit={{ opacity: 0 }}
		className={styles.outerContainer}>
		<motion.div
			initial={{ scale: 0.8, translateX: "-50%", translateY: "-50%", opacity: 0 }}
			animate={{ scale: 1, translateX: "-50%", translateY: "-50%", opacity: 1, transition: { ease: "backOut" } }}
			exit={{ scale: 0.8, translateX: "-50%", translateY: "-50%", opacity: 0 }}
			className={styles.innerContainer}
			onClick={e => e.stopPropagation()}>

			<div className="flex">
				<input ref={toField} className={tw(styles.inputBar, "grow")} placeholder="To" />
				<button
					onClick={e => props.onClose?.()}
					className={styles.controls.buttons.exit}>
						<XCircleIcon className={styles.controls.icon.medium} />
				</button>
			</div>

			<input ref={subjectField} className={styles.inputBar} placeholder="Subject" />

			<textarea ref={textField} className={styles.textBox} />

			<div className={styles.controls.container}>
				<div className="grow"></div>
				<motion.button
					onClick={e => sendEmail()}
					initial={{ scale: 1, paddingLeft: 16, paddingRight: 16 }}
					whileHover={{ scale: 1.15, paddingLeft: 32, paddingRight: 32, transition: { ease: "backOut", duration: 0.25 } }}
					className={tw(styles.controls.buttons.base, styles.controls.buttons.send)}>
						Send <PaperAirplaneIcon className={styles.controls.icon.small} />
				</motion.button>
			</div>
		</motion.div>
	</motion.div>
}

export default ComposeBox;