import Question from "./Question";
import { Form, Formik } from "formik";
import { TakeQuizSchema } from "../../../formsConfig";
import Spinner from 'react-bootstrap/Spinner';

export default function Questions({ questions, choices }) {

    const handelSubmit = async (values) => {
        console.log(JSON.stringify(values, null, 2))
    }
    return (
        <Formik
            initialValues={{ answers: [] }}
            validationSchema={TakeQuizSchema}
            onSubmit={handelSubmit}

        >
            {({ isSubmitting }) => (
                <Form className='form smallTxtBox'>
                    <div className='quiz'>
                        {questions.map((q, ind) => (
                            <div className="question" key={q.ID}>
                                <Question question={q} choices={choices[q.ID]} />
                            </div>
                        ))}


                    </div>

                    <button type="submit" className="submitBtnQuiz" >
                        {isSubmitting ?
                            <Spinner animation="border" variant="light" size="sm" /> :
                            <span>submit</span>
                        }
                    </button>

                </Form>
            )}
        </Formik>
    );
}