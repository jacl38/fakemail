import { useEffect, useState } from "react"

const useLocalStorage = (key: string, defaultValue: any) => {
	const [storedValue, setStoredValue] = useState();
	const [valueFound, setValueFound] = useState(false);
	
	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			setStoredValue(item ? JSON.parse(item) : defaultValue);
			setValueFound(true);
		} catch(e) { console.error(e); }
	}, [key]);

	const setValue = (value: any) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
			setStoredValue(value);
		} catch(e) { console.error(e); }
	}

	return [storedValue as typeof defaultValue, setValue] as const;
}

export default useLocalStorage;