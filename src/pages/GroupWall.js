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
	const [countQuery, setCountQuery] = useState(0)
	const [count, setCount] = useState(0);
	const [originalPosts, setOriginalPosts] = useState([]);
	const [sortField, setSortdField] = useState(null);

	console.log(count);
	const { screen_name: screenName } = useParams();
	const { call } = useVK();

	useEffect(async () => {
		const data = await call("wall.get", {
			domain: screenName,
			offset: 20 * countQuery,
			extended: 1,
		});

		if (data.error) {
			return console.error("error_code: ", data.error.error_code);
		}

		const { count, items } = data.response;

		setCount(count);
		setOriginalPosts(prev => prev.slice(0).concat(items).slice(0));
		setCountQuery(() => countQuery + 1)

	}, [screenName, countQuery]);

	const posts = useMemo(() => {
		let current = originalPosts.slice(0);

		switch (sortField) {
			case "date": {
				current = current.sort((a, b) => b.datet - a.date);
				break
			}
			case "likes": {
				current = current.sort((a, b) => b.likes.count - a.likes.count);
				break
			}
			case "comments": {
				current = current.sort((a, b) => b.comments.count - a.comments.count);
				break
			}
			case "reposts": {
				current = current.sort((a, b) => b.reposts.count - a.reposts.count);
				break
			}
			default: 
				return current.filter((item) => item.text);
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
								{attachments &&
									<Attachments attachments={attachments} />}
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
