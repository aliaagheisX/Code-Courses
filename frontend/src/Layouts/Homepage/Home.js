import Resource from '../../Resource'
import ArticleComponent from '../../components/ArticleComponent'
import CourseComponent from '../../components/CourseComponent'
import api from '../../api'
import CustomCarsoul from '../../components/CustomCarsoul'
import Courses from '../Courses'

const Home = () => {
  return (<div>
  <section>
  <h2 >Articles</h2>
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
      <section>
  <h2>Courses</h2>
    <Resource
                path={api.getAllCourses}
                render={({ items: { courses } }) => (
                    <div className='elementCont' >
                        {
                            courses.map((course) => (
                                <CourseComponent course={course} key={course.ID} />
                            ))
                        }
                    </div>
                )}

                ErrorComp={<></>}
            />
      </section>

  </div>);
}

export default Home;