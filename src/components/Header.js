import React from 'react'

export default function Header ({title}) {
    return (
        <header  className="header">
        {/* <HomeButton /> */}
        <h1 className="page-title">{title}</h1>
        <nav className="filters">
          <button  className="filters__btn">Лайки</button>
          <button  className="filters__btn">Репосты</button>
          <button  className="filters__btn">Комментарии</button>
          <button  className="filters__btn">Дата</button>

          <button>фото</button>
          <button>ссылки</button>
          <button>видео</button>


        </nav>
      </header>
    )
}