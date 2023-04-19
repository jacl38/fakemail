import { Outlet } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { tw } from "../utility/tailwindUtil";
import useLocalStorage from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
import { Category, Email } from "../utility/storedTypes";
import { StarIcon } from "@heroicons/react/24/solid";
import { shuffleArray } from "../utility/mathUtils";
import ComposeBox from "../components/ComposeBox";

const styles = {
	outerContainer: tw(
		`w-full h-full`,
		`flex flex-col`,
		`bg-neutral-100`
	),
	contentContainer: tw(
		`sm:p-8 h-[calc(100vh-5rem)] max-sm:h-[calc(100vh-7rem)] max-md:h-[calc(100vh-8rem)]`,
		`transition-all`
	),
	outletContainer: tw(
		`h-full`,
		`sm:rounded-3xl`,
		`flex flex-col`,
		`bg-white sm:border-2 shadow-md`,
		`overflow-hidden`,
		`transition-all`
	)
}

const Layout = () => {
	const [initialSetup, setInitialSetup] = useLocalStorage("initial-setup", false);
	const [categories, setCategories] = useLocalStorage("categories", [] as Category[]);
	const [emails, setEmails] = useLocalStorage("emails", [] as Email[]);

	useEffect(() => {
		console.log(`Initial setup value: ${initialSetup}`);
		if(initialSetup == undefined) return;
		
		if(!initialSetup) {
			const categories: Category[] = [
				{ id: "all-mail", label: "All mail", color: "#be123c", icon: "envelope" },
				{ id: "starred", label: "Starred", color: "#fbbf24", icon: "star" },
				{ id: "sent", label: "Sent", color: "#475569", icon: "arrowUpTray" },
			];

			setCategories(categories);
			
			let emails: Email[] = [];
			emails.push({
				id: "0",
				categoryId: "starred",
				sender: { address: "admin@fakemail.jclark.space", name: "fakemail Admin" },
				subject: "Your new fakemail account",
				body: "body",
				timestamp: new Date()
			});

			emails.push(...[...Array(50)].map((_, i) => ({
				id: (i+1).toString(),
				categoryId: categories[Math.floor(Math.random() * categories.length)].id,
				sender: { address: "sender@email.com", name: "Email Sender" },
				subject: shuffleArray("this is a test email".split(" "), i).join(" "),
				body: shuffleArray("this is the body content of the test email".split(" "), i).join(" "),
				timestamp: new Date()
			})));

			setEmails(emails);

			location.reload();
		}
		setInitialSetup(true);
	}, [initialSetup]);

	return <div className={styles.outerContainer}>
		<PageHeader />
		<div className={styles.contentContainer}>
			<div className={styles.outletContainer}>
				<Outlet />
			</div>
		</div>
	</div>
}

export default Layout;