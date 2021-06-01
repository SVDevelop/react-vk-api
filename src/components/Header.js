import React from 'react'
import {DataContext} from '../ContextApp'

export default function Header ({title}) {
  const {sortFlag, setSortFlag} = DataContext()
  // console.log(sortFlag);
  return (
      <header  className="header">
      {/* <HomeButton /> */}
      <h1 className="page-title">{title}</h1>
      <nav className="filters">
        <button onClick={()=>setSortFlag('date')} className="filters__btn">Дата</button>
        <button onClick={()=>setSortFlag('likes')} className="filters__btn">Лайки</button>
        <button onClick={()=>setSortFlag('comments')} className="filters__btn">Комментарии</button>
        <button onClick={()=>setSortFlag('reposts')} className="filters__btn">Репосты</button>

        <button>фото</button>
        <button>ссылки</button>
        <button>видео</button>


      </nav>
    </header>
  )
}

