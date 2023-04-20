import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import MailView from './pages/MailView'
import MailDetail from './pages/MailDetail'
import useLocalStorage from './hooks/useLocalStorage'
import { Category, Email } from './utility/storedTypes'
import { useEffect } from 'react'
import { shuffleArray } from './utility/mathUtils'

const App = () => {
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

	return <BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<MailView />} />
				<Route path="/mail" element={<MailDetail />} />
			</Route>
		</Routes>
	</BrowserRouter>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
