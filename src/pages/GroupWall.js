import React, { useEffect, useMemo, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Attachments, Header, LikePanel } from "../components";
import { DataContext } from "../ContextApp";
import useVK from "../VK";

// prettier-ignore
const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const timeConverter = (UNIX_timestamp) => {
	const a = new Date(UNIX_timestamp * 1000);

	const year = a.getFullYear();
	const month = months[a.getMonth()];
	const date = a.getDate();
	const hour = a.getHours();
	const min = a.getMinutes();
	const sec = a.getSeconds();
	const time =
		date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
	return time;
};

export default function GroupWall(props) {
	// const { sortFlag, qsort, sortArr, setSortArr } = DataContext();
	// const { count, items } = wallState.groups;
	// // const posts = qsort(items, 'likes')
	// // console.log("original:", items, "sort:", posts);
	// console.log(qsort(items, "date"));

	// items.length && setSortArr(qsort(items, sortFlag));
	// let posts = sortArr.length ? sortArr.map((i) => i) : items.map((i) => i);
	const [count, setCount] = useState(0);
	const [originalPosts, setOriginalPosts] = useState([]);
	const [sortField, setSortdField] = useState(null);

	const { screen_name: screenName } = useParams();
	const { call } = useVK();

	useEffect(async () => {
		const data = await call("wall.get", {
			domain: screenName,
			extended: 1,
		});

		if (data.error) {
			return console.error("error_code: ", data.error.error_code);
		}

		const { count, items } = data.response;

		setCount(count);
		setOriginalPosts(items);

		// if (count) {
		// }

		// count &&
		// 	setWallState((prevState) => ({
		// 		...prevState,
		// 		groups: {
		// 			...groupsState.groups,
		// 			count,
		// 			items: items,
		// 		},
		// 	}));
	}, [screenName]);

	const posts = useMemo(() => {
		let current = originalPosts.slice(0);

		if (sortField === "likes") {
			current = current.sort((a, b) => b.likes.count - a.likes.count);
		}

		return current.filter((item) => item.text);
	}, [sortField, originalPosts]);

	return (
		<div className="container">
			<Header title={`Лента (${sortField})`} onSelect={setSortdField} />

			<div className="content">
				<ul className="wall-posts">
					{posts.map((post) => {
						const {
							attachments,
							comments,
							date,
							from_id,
							id,
							is_pinned,
							likes,
							owner_id,
							post_source,
							post_type,
							reposts,
							text,
						} = post;

						// if (!text) {
						// 	return;
						// }

						return (
							<li key={id} className={"wall-posts__item"}>
								<div className="wall-posts__header">
									<LikePanel
										date={timeConverter(date)}
										likes={likes}
										owner_id={owner_id}
										reposts={reposts}
										comments={comments}
										post_source={post_source}
										postText={text}
										post_type={post_type}
									/>
								</div>
								{parseContent(text).map((text, i) =>
									i === 0 ? (
										<span className="wall-posts__title">{text}</span>
									) : (
										<div className="wall-posts__content">{text}</div>
									)
								)}
								{attachments && <Attachments attachments={attachments} />}
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}

function parseContent(value) {
	const arr = value.split("\n\n");

	const title = arr.splice(0, 1);
	const content = arr.splice(0).join("\n").trim();
	return [title, content];
}

function HomeButton() {
	let history = useHistory();

	function handleClick() {
		history.push("/");
	}

	return (
		<button type="button" onClick={handleClick}>
			Go home
		</button>
	);
}
