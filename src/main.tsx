import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import MailView from './pages/MailView'
import MailDetail from './pages/MailDetail'
import useLocalStorage from './hooks/useLocalStorage'
import { Category, Email } from './utility/storedTypes'
import { createContext, useEffect } from 'react'
import { shuffleArray } from './utility/mathUtils'

interface MailItems {
	categories: Category[],
	setCategories: (categories: Category[]) => void,
	emails: Email[],
	setEmails: (emails: Email[]) => void
}

export const MailContext = createContext<MailItems>({
	categories: [],
	setCategories: c => {},
	emails: [],
	setEmails: e => {}
});

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
				id: 0,
				categoryId: "starred",
				sender: { address: "admin@fakemail.jclark.space", name: "fakemail Admin" },
				subject: "Your new fakemail account",
				body: "body",
				timestamp: Date.now()
			});

			emails.push(...[...Array(50)].map((_, i) => ({
				id: i + 1,
				categoryId: categories[Math.floor(Math.random() * categories.length)].id,
				sender: { address: "sender@email.com", name: "Email Sender" },
				subject: shuffleArray("this is a test email".split(" "), i).join(" "),
				body: shuffleArray("this is the body content of the test email".split(" "), i).join(" "),
				timestamp: Date.now()
			})));
			setEmails(emails);
		}
		setInitialSetup(true);
	}, [initialSetup]);

	return <BrowserRouter>
		<MailContext.Provider value={{
			categories: categories,
			setCategories: setCategories,
			emails: emails,
			setEmails: setEmails
		}}>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<MailView />} />
					<Route path="/mail" element={<MailDetail />} />
				</Route>
			</Routes>
		</MailContext.Provider>
	</BrowserRouter>
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />)
