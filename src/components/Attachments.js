import React from 'react'

export default function Attachments ({attachments, i}) {
    return (
        <div className="attachments">
        {
        attachments
            .map((attachment) => {
                switch (attachment.type) {
                    case "video":
                        console.log(attachment, 'video');
                      return (
                        <>
                          <video controls width="400" height="300">
                            <source src="video.mp4" type="video/mp4" />
                          </video>
                        </>
                      );

                    case "photo":
                      return (
                          <div className="attachment__photo">
                              <img src={attachment.photo.photo_604} alt={attachment.photo.text} />
                          </div>
                      );
                    // break;
                    case "album":
                        return (
                            <div className="attachments__album">
                                <div className="attachments__info">
                                    <span className="attachments__title">{attachment.album.title}</span>
                                    <span className="attachments__count">{attachment.album.size}</span>
                                </div>
                                <img src={attachment.album.thumb.photo_604} alt={attachment.album.title} />
                            </div>
                        )
                    // break;
                    case "link":
                        return (
                            <div className="attachment__link">
                                <a href={attachment.link.url} target="_blank" rel="nofollow noopener">
                                    <img src={attachment.link.photo.photo_130} alt={attachment.link.title} />
                                </a>
                                
                                <a className="attachment__title" href={attachment.link.url} target="_blank" rel="nofollow noopener">{attachment.link.title}</a>
                            </div>
                        );
                    default:
                        return null;
                }
            }
            )
            .map((item,i) =>(
                <div key={i} className="attachments__item">
                    {
                        item
                    }
                </div>
            ))
        }           
        </div>
    )
}