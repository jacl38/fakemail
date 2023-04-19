

export interface Category {
	id: string,
	label: string,
	color: string,
	icon: string
}

export interface Email {
	id: string,
	categoryId: string,
	sender: {
		address: string,
		name: string
	},
	subject: string,
	body: string,
	timestamp: Date
}