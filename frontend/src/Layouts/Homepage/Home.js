import Resource from '../../Resource'
import ArticleComponent from '../../components/ArticleComponent'
import CourseComponent from '../../components/CourseComponent'
import QuizComponent from '../../components/QuizComponent'
import api from '../../api'
import CustomCarsoul from '../../components/CustomCarsoul'
import styles from './index.module.css'

const Home = () => {
  return (
    <section className={styles.space}>
      <div className='space'>
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
      </div>
      <div className='space'>
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
      </div>
      <div className='space'>

        <h2>Quizzes</h2>
        <Resource
          path={api.getAllQuizzes}
          render={({ items: { quizzes } }) => (
            <CustomCarsoul
              items={
                quizzes.map((quiz) => (
                  <QuizComponent quiz={quiz} key={quiz.ID} />
                ))
              }
            />
          )}

          ErrorComp={<></>}
        />
      </div>
    </section>
  );
}

export default Home;