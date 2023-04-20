import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout'
import MailView from './pages/MailView'
import MailDetail from './pages/MailDetail'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<Layout />}>
				<Route index element={<MailView />} />
				<Route path="/mail" element={<MailDetail />} />
			</Route>
		</Routes>
	</BrowserRouter>
)
