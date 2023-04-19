import { useEffect, useState } from "react"

const useLocalStorage = (key: string, defaultValue: any) => {
	const [storedValue, setStoredValue] = useState<string>();
	
	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key);
			setStoredValue(item ? JSON.parse(item) : defaultValue);
			// _setStoredScore(item ? JSON.parse(item) : -1);
		} catch(e) { console.error(e); }
	}, [key]);

	const setValue = (value: any) => {
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
			setStoredValue(value);
		} catch(e) { console.error(e); }
	}

	return [storedValue, setValue] as const;
}

export default useLocalStorage;