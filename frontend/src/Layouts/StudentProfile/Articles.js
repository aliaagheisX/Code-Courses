import React, { useState } from 'react'
import ArticleComponent from '../../components/ArticleComponent'

export default function Articles({ articlesRead, articlesLiked }) {
    const [likedArticles, setLikedArticles] = useState(0)
    const [readArticles, setReadArticles] = useState(1)
    console.log(readArticles, likedArticles)
    const handelClick = () => {
        setReadArticles(!readArticles)
        setLikedArticles(!likedArticles)
    }
    return (
        <section>
            <h3>Articles</h3>
            <div className='tag-list'>
                <div
                    className={`tag ${readArticles ? 'active' : ''}`}
                    onClick={handelClick}
                >read</div>
                <div className={`tag ${likedArticles ? 'active' : ''}`} onClick={handelClick}>liked</div>
            </div>
            <div className='elementCont' >
                {
                    readArticles ?
                        articlesRead.map((article) => (
                            <ArticleComponent article={article} key={article.ID} />
                        )) :
                        articlesLiked.map((article) => (
                            <ArticleComponent article={article} key={article.ID} />
                        ))
                }
            </div>
        </section>
    )
}
