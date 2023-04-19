import { tw } from "../utility/tailwindUtil"
import MailViewHeader from "../components/MailViewHeader"
import MailItem from "../components/MailItem"
import useLocalStorage from "../hooks/useLocalStorage"
import { Category, Email } from "../utility/storedTypes"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const styles = {
	outerContainer: tw(
		`flex flex-col h-full`
	),
	mailList: {
		container: tw(
			`py-4 px-2.5 space-y-2`,
			`overflow-y-scroll overflow-x-hidden`
		)
	}
}

const MailView = () => {
	const [category, setCategory] = useState("all-mail");
	const [categories, setCategories] = useLocalStorage("categories", [])
	const [emails, setEmails] = useLocalStorage("emails", []);

	const [asdf, setAsdf] = useLocalStorage("asdf", 69);

	useEffect(() => {
		if(asdf == 69) setAsdf(420);
	}, [asdf]);

	useEffect(() => {
		if((categories ?? []).length == 0) return;
		const urlSearch = new URLSearchParams(window.location.search);
		const categoryFromUrl = urlSearch.get("category") ?? "all-mail";
		let selectedCategory = categoryFromUrl;

		if(!((categories ?? []) as Category[]).map(cat => cat.id).includes(categoryFromUrl)) {
			selectedCategory = "all-mail";
			urlSearch.set("category", "all-mail");
			// window.location.search = `?${urlSearch.toString()}`;
		}
		setCategory(selectedCategory);
	}, [categories]);

	const filteredEmails = (emails as Email[] ?? []).filter(email => email.categoryId == category || category == "all-mail");

	const selectedCategoryIndex = ((categories ?? []) as Category[]).map(c => c.id).indexOf(category);

	return <div className={styles.outerContainer}>
		<MailViewHeader selectedCategory={category} selectedIndex={selectedCategoryIndex} onSelect={setCategory} />

		<div className={styles.mailList.container}>
			<AnimatePresence>
				{filteredEmails.map((email, i) => <MailItem key={email.id} {...email} index={i}/>)}
			</AnimatePresence>
		</div>

	</div>
}

export default MailView;