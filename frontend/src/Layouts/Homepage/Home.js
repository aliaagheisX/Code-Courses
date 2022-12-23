import Resource from '../../Resource'
import ArticleComponent from '../../components/ArticleComponent'
import api from '../../api'
import CustomCarsoul from '../../components/CustomCarsoul'

const Home = () => {
  return (<div>
    <Resource
      path={api.getArticles}
      render={({ items: { articles } }) => (

        <CustomCarsoul
          items={
            articles.map((article) => (
              <ArticleComponent article={article} key={article.ID} />
            ))
          }
        />

      )}
      ErrorComp={<></>}
    />


  </div>);
}

export default Home;