import styles from './ViewQuiz.css'
// import styles from 'index.css';

const ViewQuiz = ({Ques,Name,Topics}) => {

return (<div className='quiz'> <div className="viewquestions">
        <h2>Hobby Quiz</h2> 
        <h1>Prepared By: {Name}</h1>
       <div className='tag-list'>{Topics.map((i)=>(<span className='tag'>{i.Name} </span>
        ))}
        </div>
{Ques.map((i)=>(
    <div className="outlay">
<div className="question" key={i.id}>
<div className="qu">{i.body} 
    <div>
<input type="checkbox" name={i.choice1}/> {i.choice1}
</div><div>
<input type="checkbox" name={i.choice2}/> {i.choice2}
</div><div>
<input type="checkbox" name={i.choice3}/> {i.choice3}
</div><div>
<input type="checkbox" name={i.choice4}/> {i.choice4}
</div>
{/* </span> */}
<p className='grade'>points: {i.grade}</p>
</div  >
</div> 
</div>
))}

    </div>
    <div className='Submitbutton'>
<button>Submit</button>
</div>
    </div>
 );
}
 
export default ViewQuiz;
