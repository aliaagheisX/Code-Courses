import { useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../api';
import Resource from '../../../Resource';
import React from 'react'
import Quiz from './Quiz';



export default function ViewQuiz() {
    const { id } = useParams()
    return (
        <Resource
            path={api.getQuizById(id)}
            render={({ items }) => <Quiz quiz={items} />}
        />
    );
}
