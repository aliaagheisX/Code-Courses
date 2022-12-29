import React, { useState } from "react";

import Question from "./Question";
import { Form, Formik } from "formik";
import { TakeQuizSchema } from "../../../formsConfig";
import Spinner from "react-bootstrap/Spinner";
import api from "../../../api";
import useToken from "../../../useToken";
import { useNavigate } from "react-router-dom";
export default function Questions({ questions, choices, QuizID }) {
  const navigate = useNavigate();
  const { token } = useToken();
  const [backendError, setBackenError] = useState(null);

  const handelSubmit = async (values) => {
    try {
      const res = await fetch(api.takeQuiz(QuizID), {
        method: "POST",
        headers: { "Content-Type": "application/json", token: token },
        body: JSON.stringify(values),
      });

      const data = await res.json();
      if (!res.ok) throw Error(data.message);
      console.log("succuss", data);
      window.location.reload();
      navigate(`/quizzes/${QuizID}`);
    } catch (err) {
      console.log("error", err);
      setBackenError(err);
    }
  };
  return (
    <Formik
      initialValues={{ answers: [] }}
      validationSchema={TakeQuizSchema}
      onSubmit={handelSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="form smallTxtBox">
          <div className="quiz">
            {questions.map((q, ind) => (
              <div className="question" key={q.ID}>
                <Question question={q} choices={choices[q.ID]} />
              </div>
            ))}
          </div>
          {/* backend error */}
          {backendError && <span className="errorForm">{backendError}</span>}
          <button type="submit" className="submitBtnQuiz">
            {isSubmitting ? (
              <Spinner animation="border" variant="light" size="sm" />
            ) : (
              <span>submit</span>
            )}
          </button>
        </Form>
      )}
    </Formik>
  );
}
