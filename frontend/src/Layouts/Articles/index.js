import React from 'react'
import InstructorProtectedComponent from '../../components/InstructorProtectedComponent'
import Resource from '../../Resource'
import { NavLink } from 'react-router-dom'
import api from '../../api'
import ArticleComponent from '../../components/ArticleComponent'
export default function Articles() {

  return (
    <section>
      <h2>Articles</h2>
      <InstructorProtectedComponent
        render={<NavLink to='add'><button className='btnS' >Add Article</button></NavLink>}

        replace={<></>}
      />
      <Resource
        path={api.getArticles}
        render={({ items: { articles } }) => (
          <div className='elementCont' >
            {
              articles.map((article) => (
                <ArticleComponent article={article} key={article.ID} />
              ))
            }
          </div>
        )}
        ErrorComp={<></>}
      />
    </section>
  )
}
