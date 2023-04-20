import { tw } from "../utility/tailwindUtil"
import MailViewHeader from "../components/MailViewHeader"
import MailItem from "../components/MailItem"
import useLocalStorage from "../hooks/useLocalStorage"
import { Category, Email } from "../utility/storedTypes"
import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { MailContext } from "../main"
import { clamp } from "../utility/mathUtils"

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
	const { emails, categories } = useContext(MailContext);
	const [page, setPage] = useState(0);

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

	let filteredAndSortedEmails = (emails as Email[] ?? [])
		.filter(email => email.categoryId == category || category == "all-mail");
	filteredAndSortedEmails.sort((a, b) => b.timestamp - a.timestamp);
	const pageCount = Math.ceil(filteredAndSortedEmails.length / 50);
	filteredAndSortedEmails = filteredAndSortedEmails.slice(page * 50, (page + 1) * 50);

	const selectedCategoryIndex = ((categories ?? []) as Category[]).map(c => c.id).indexOf(category);

	return <div className={styles.outerContainer}>
		<MailViewHeader
			selectedCategory={category}
			selectedIndex={selectedCategoryIndex}
			onSelect={setCategory}
			onPageChange={d => {
				setPage(p => clamp(p + d, 0, pageCount - 1));
			}}
			selectedPage={page}
			pageCount={pageCount}
			emailCount={filteredAndSortedEmails.length}/>

		<div className={styles.mailList.container}>
			<AnimatePresence>
				{filteredAndSortedEmails.map((email, i) => <MailItem {...email} key={email.id} index={i}/>)}
			</AnimatePresence>
		</div>

	</div>
}

export default MailView;