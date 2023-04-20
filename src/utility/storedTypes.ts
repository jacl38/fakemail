

export interface Category {
	id: string,
	label: string,
	color: string,
	icon: string
}

export interface Email {
	id: number,
	categoryId: string,
	sender: {
		address: string,
		name: string
	},
	recipient: {
		address: string,
		name: string
	},
	subject: string,
	body: string,
	timestamp: number
}