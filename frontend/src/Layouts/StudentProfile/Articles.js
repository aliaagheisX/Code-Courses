import React, { useState } from 'react'
import ArticleComponent from '../../components/ArticleComponent'
import CustomCarsoul from '../../components/CustomCarsoul'

export default function Articles({ articlesRead, articlesLiked }) {
    const [likedArticles, setLikedArticles] = useState(0)
    const [readArticles, setReadArticles] = useState(1)
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
            {
                readArticles ?
                    <CustomCarsoul
                        items={
                            articlesRead.map((article) => (
                                <ArticleComponent article={article} key={article.ID} />
                            ))
                        }
                    /> :
                    <CustomCarsoul
                        items={
                            articlesLiked.map((article) => (
                                <ArticleComponent article={article} key={article.ID} />
                            ))
                        }
                    />

            }
        </section>
    )
}
