import { EnvelopeIcon, PencilIcon, StarIcon } from "@heroicons/react/24/solid"

type iconProps = typeof EnvelopeIcon.defaultProps;

export const icons: { [key: string]: (props: iconProps) => JSX.Element } = {
	envelope: (props) => <EnvelopeIcon {...props}/>,
	star: (props) => <StarIcon {...props}/>,
	pencil: (props) => <PencilIcon {...props}/>
}