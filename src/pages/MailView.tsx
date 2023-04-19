import { tw } from "../utility/tailwindUtil"
import MailViewHeader from "../components/MailViewHeader"
import MailItem from "../components/MailItem"
import useLocalStorage from "../hooks/useLocalStorage"
import { Category, Email } from "../utility/storedTypes"
import { useEffect, useState } from "react"

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
	const [categories, setCategories] = useLocalStorage("categories", [])
	const [emails, setEmails] = useLocalStorage("emails", []);


	useEffect(() => {
		if((categories ?? []).length == 0) return;
		const urlSearch = new URLSearchParams(window.location.search);
		const categoryFromUrl = urlSearch.get("category") ?? "all-mail";
		let selectedCategory = categoryFromUrl;

		if(!((categories ?? []) as Category[]).map(cat => cat.id).includes(categoryFromUrl)) {
			selectedCategory = "all-mail";
			urlSearch.set("category", "all-mail");
			window.location.search = `?${urlSearch.toString()}`;
		}
		setCategory(selectedCategory);
	}, [categories]);

	const filteredEmails = (emails as Email[] ?? []).filter(email => email.categoryId == category || category == "all-mail");

	useEffect(() => {
		console.log(`set ${category}`);
	}, [category]);

	return <div className={styles.outerContainer}>

		<MailViewHeader selectedCategory={category} onSelect={setCategory} />

		<div className={styles.mailList.container}>
			{filteredEmails.map((email, i) => <MailItem {...email}/>)}
		</div>

	</div>
}

export default MailView;