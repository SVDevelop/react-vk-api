import { Link } from "react-router-dom";

export default function SearchGroups(props) {
	const { groups } = props;

	return (
		<ul className={"search-list"}>
			{groups.map((group) => {
				const {
					id,
					name,
					screen_name,
					is_closed,
					type,
					photo_50,
					photo_100,
					photo_200,
				} = group;

				return (
					<li className={"search-list__item"} key={id}>
						<Link className={"search-list__link"} to={`/${screen_name}`}>
							<img className={"search-list__img"} src={photo_100} />
							<span className={"search-list__title"}>{name}</span>
							<span className={"search-list__title"}>{type}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
