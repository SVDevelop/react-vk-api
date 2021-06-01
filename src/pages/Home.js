import { useEffect, useState } from "react";
import Input from "../components/Input";
import SearchGroups from "../components/SearchGroups";
import { useVK } from "../VK";

export default function Home(props) {
	const [searchString, setSearchString] = useState("");
	const [count, setCount] = useState(0);
	const [groups, setGroups] = useState([]);

	const { call } = useVK();

	useEffect(async () => {
		if (searchString) {
			const { response } = await call("groups.search", { q: searchString });
			const { count, items } = response;

			setCount(count);
			setGroups(items);
		}
	}, [searchString]);

	return (
		<div className="container">
			<Input onEnter={setSearchString} />
			<SearchGroups count={count} groups={groups} />
		</div>
	);
}
