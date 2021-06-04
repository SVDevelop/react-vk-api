import React, { useCallback } from "react";

export default function Header(props) {
	// const {sortFlag, setSortFlag} = DataContext()
	// console.log(sortFlag);
	const { onSelect, title } = props;

	
	return (
		<header className="header">
				{/* <HomeButton /> */}
				<h1 className="page-title">{title}</h1>

				<nav className="filters">
					<button onClick={() => onSelect("date")} className="filters__btn">
						Дата
					</button>
					<button onClick={() => onSelect("likes")} className="filters__btn">
						Лайки
					</button>
					<button onClick={() => onSelect("comments")} className="filters__btn">
						Комментарии
					</button>
					<button onClick={() => onSelect("reposts")} className="filters__btn">
						Репосты
					</button>

					<button onClick={() => onSelect("photo")} className="filters__btn">
						фото
					</button>
					<button onClick={() => onSelect("links")} className="filters__btn">
						ссылки
					</button>
					<button onClick={() => onSelect("videos")} className="filters__btn">
						видео
					</button>
				</nav>
			</header>
	)
}
