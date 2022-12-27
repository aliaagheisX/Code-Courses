import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import Resource from '../../../Resource';
import React from 'react'
import Quiz from './Quiz';



export default function ViewQuiz() {
    const { id } = useParams()
    const instructorName = 'Dr.hamada';
    const Topics = [{ Name: 'favfood' }, { Name: 'favcolor' }];
    // const [choices] =useState();

    const Ques = [
        { body: 'What is your favorite color?', choices: [{ body: "orange", istrue: 1, id: 0 }, { body: "RED", istrue: 1 }, { body: "GREEN", istrue: 1, id: 1 }, { body: "orange", istrue: 1, id: 2 }, { body: "orange", istrue: 1, id: 3 }], grade: 1, id: 1 },
        { body: 'What is your favorite food?', choices: [{ body: 'mango', istrue: 1, id: 0 }, { body: 'salad', istrue: 2, id: 1 }, { body: 'fruit', istrue: 0, id: 2 }, { body: 'meat', istrue: 0, id: 3 }], grade: 0.5, id: 2, id: 4 },
        { body: 'What is your favorite drink?', choices: [{ body: 'lemon', istrue: 1, id: 0 }, { body: 'apple', istrue: 1, id: 1 }, { body: 'soda', istrue: 1, id: 2 }, { body: 'fanta', istrue: 1, id: 3 }], grade: 3, id: 4 }
    ];

    // console.log(Ques[0].choices);
    // console.log(Ques);
    // console.log(choices);

    return (
        <Resource
            path={api.getQuizById(id)}
            render={({ items }) => <Quiz quiz={items} />}
        />
    );
}
