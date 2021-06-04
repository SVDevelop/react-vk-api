import { useEffect, useState, useCallback } from "react";
import {Input, Pagination, SearchGroups} from "../components";
// import SearchGroups from "../components/SearchGroups";
import { useVK } from "../VK";

export default function Home(props) {
	const [countQuery, setCountQuery] = useState(0)
	const [groupsSize, setGroupsSize ] = useState(20)
	const [pagesCount, setPagesCount] = useState(5)
	const [currentPage, setCurrentPage] = useState(1);
	const [searchString, setSearchString] = useState("");
	const [isLoad, setIsLoad] = useState(false)
	const [count, setCount] = useState(0);
	const [groups, setGroups] = useState([]);
	
	const { call } = useVK();
	// const q = useCallback((str, coutQuery, countItem=20) => {
	// 	return async () => {
	// 		let arr = []
	// 		let success = false
	// 		for (let i = 0; i < coutQuery; i++) {
	// 			console.log({ q: str, searchString })
	// 			const { response } = await call("groups.search", { 
	// 				q: str,
	// 				offset: i * countItem,
	// 				count: countItem 
	// 			});
	// 			console.log('response: ', response);
	// 			if (response) {
	// 				success = true
	// 				const { count, items } = response;
	// 				setCount(count);
	// 				arr.push(...items)
	// 				console.log('Записей найдено: ', count);
	// 				if (count  > items.length && pagesCount > 0) {
	// 					setPagesCount(pagesCount - 1)
	// 				}
	// 			} else {
	// 				break
	// 			}
	// 		}
	// 		success &&
	// 			setGroups(arr);
	// 		// setIsLoad(false)
	// 		// setSearchString('')
	// 	}
	// }, [searchString])

	async function findGroups(q, count = 20, offset = 0) {
		const { response } = await call("groups.search", {
			q,
			count,
			offset
		});
		if (response) {
			return response
		} else {
			return { count: 0, items: []}
		}
	}

	useEffect(async () => {
		const { count, items } = await findGroups(searchString, 20, 0)
		setGroups(items);
		setCurrentPage(1)
		setCount(count);
	}, [searchString]);

	useEffect(async () => {
		console.log(`Showing groups from '${searchString}' search with offset ${currentPage * 20}`)
		setGroups(await findGroups(searchString, 20, currentPage * 20).then(res => res.items));
	}, [currentPage]);

	// 	let arr = []
	// 	let success = false
	// 	console.log({ offset: countQuery * groupsSize, count: groupsSize})
	// 	const { response } = await call("groups.search", { 
	// 		q: searchString,
	// 		offset: countQuery * groupsSize,
	// 		count: groupsSize
	// 	});
	// 	console.log('response: ', response);
	// 	if (response) {
	// 		success = true
	// 		const { count, items } = response;
	// 		setCount(count);
	// 		arr.push(...items)
	// 		console.log('Записей найдено: ', count);
	// 		if (count  > items.length && pagesCount > 0) {
	// 			setPagesCount(pagesCount - 1)
	// 		}
	// 	} else {
	// 		console.log('brack');
	// 	}
	// 	setCountQuery(countQuery + 1)
	// 	console.log(`В общей сложности ${arr.length} записей`)
	// 	success &&
	// 		setGroups(arr);
	// 	// setIsLoad(false)
	// 	// setSearchString('')
	// }, [searchString]);
	// console.log(count, searchString, groups);
	console.log({ groups, count })
	return (
		<div className="container">
			<Input onEnter={setSearchString} />
			<SearchGroups count={count} groups={groups} />
			<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} pagesCount={Math.ceil(groups.length / 20)}/>
		</div>
	);
}
