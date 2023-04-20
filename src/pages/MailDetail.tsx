import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage"
import { Email } from "../utility/storedTypes";
import { tw } from "../utility/tailwindUtil";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon, ClockIcon, UserCircleIcon } from "@heroicons/react/24/solid";

const styles = {
	outerContainer: tw(
		`flex flex-col h-full`
	),
	topBar: {
		container: tw(
			`border-b-8 border-gray-300 border-double`,
			`bg-neutral-200`,
			`h-12 shrink-0`,
			`flex items-center`
		),
		button: {
			base: tw(
				`flex items-center justify-center shrink-0`
			),
			back: tw(
				`w-16 h-full`,
				`hover:bg-stone-300`,
				`transition-colors`
			)
		},
		from: {
			container: tw(`flex space-x-2 items-center ml-4 shrink truncate`),
			label: tw(`font-semibold animate-fadeIn truncate`)
		}
	},
	icon: {
		small: tw("w-6 h-6 shrink-0"),
		medium: tw("w-8 h-8 shrink-0")
	}
}

const MailDetail = () => {
	const [emails, setEmails] = useLocalStorage<Email[]>("emails", [] as Email[]);
	const [thisEmail, setThisEmail] = useState<Email>();

	const navigate = useNavigate();

	useEffect(() => {
		if(emails.length == 0) return;
		const idFromUrl = new URLSearchParams(window.location.search);
		const id = idFromUrl.get("id") ?? "-1";
		
		const foundEmail = emails.find(e => e.id == id);
		setThisEmail(foundEmail);
	}, []);

	const emailDate = new Date(thisEmail?.timestamp as unknown as string);

	return <div className={styles.outerContainer}>

		<div className={styles.topBar.container}>
			<button onClick={e => navigate(-1)}
				className={tw(styles.topBar.button.base, styles.topBar.button.back)}>
					<ChevronLeftIcon className="w-6 h-6" />
			</button>
			<h2 className={styles.topBar.from.container}>
				<UserCircleIcon className={tw(styles.icon.small, "max-sm:hidden")} />
				<span className={styles.topBar.from.label}>{thisEmail?.sender.name}a wjlerjawe lrjawj reawejrlkawjer klaw jrkawekr jawl rjawe rkjawl el</span>
			</h2>
			<div className="grow"></div>
			<div className="mr-4 sm:space-x-2 flex max-sm:flex-col max-sm:text-sm items-start animate-fadeIn shrink-0">
				<span className="font-semibold">{emailDate.toLocaleString(undefined, { dateStyle: "medium" })}</span>
				<span className="max-sm:collapse"> at </span>
				<span className="font-semibold">{emailDate.toLocaleString(undefined, { timeStyle: "long" })}</span>
				<ClockIcon className={tw(styles.icon.small, "text-neutral-400 max-sm:collapse")} />
			</div>
		</div>

		<div className="grow overflow-y-scroll p-2 shrink-0">
			<h3 className="font-semibold">{thisEmail?.subject}</h3>
			<hr className="my-2 w-1/2 border-none h-0.5 bg-gradient-to-r from-neutral-200 to-transparent" />
			<p>
				{thisEmail?.body}
			</p>
		</div>
	</div>
}

export default MailDetail;