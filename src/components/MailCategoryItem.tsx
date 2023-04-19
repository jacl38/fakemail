import { tw } from "../utility/tailwindUtil";
import { Category } from "../utility/storedTypes";
import { icons } from "../utility/icons";
import { NavLink } from "react-router-dom";

const styles = {
	outerContainer: tw(
		`min-w-[12rem]`,
		`whitespace-nowrap`,
		`px-2 pt-2`,
		`flex flex-col justify-between`
	),
	label: {
		container: tw(
			`flex items-center space-x-2`
		),
		icon: tw(
			`w-6 inline shrink-0`
		),
		title: tw(
			`truncate`,
			`max-sm:w-full`
		),
	}
}


const MailCategoryItem = (props: Category & { onSelect?: (id: string) => void }) => {
	return <NavLink to={`/?category=${props.id}`} onClick={e => props.onSelect?.(props.id)} className={styles.outerContainer}>
		<div className={styles.label.container}>
			{icons[Object.keys(icons).includes(props.icon) ? props.icon : "envelope"]({ color: props.color ?? "#be123c", className: styles.label.icon })}
			<p className={styles.label.title}>{props.label}</p>
		</div>
		<div style={{ backgroundColor: props.color ?? "#be123c" }} className="w-full h-1 rounded-t-full"></div>
	</NavLink>
}

export default MailCategoryItem;