import Resource from '../../Resource'
import ArticleComponent from '../../components/ArticleComponent'
import CourseComponent from '../../components/CourseComponent'
import api from '../../api'
import CustomCarsoul from '../../components/CustomCarsoul'
import Courses from '../Courses'
import styles from './index.module.css'

const Home = () => {
  return (<div >
  <section className={styles.space}>
  <h2 >Articles</h2>
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
      </section>
      <div className='space'>
      <section className={styles}>
  <h2>Courses</h2>
    <Resource
                path={api.getAllCourses}
                render={({ items: { courses } }) => (
                  <CustomCarsoul
                  items={
                      courses.map((course) => (
                          <CourseComponent course={course} key={course.ID} />
                      ))
                  }
              />
                )}

                ErrorComp={<></>}
            />
      </section>
      </div>

  </div>);
}

export default Home;