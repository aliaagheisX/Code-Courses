import styles from './ViewQuiz.css'
// import styles from 'index.css';


const ViewQuiz = ({Ques,Name,Topics}) => {

    const handleClick = () => {
        return (  
            <div>
               {/* {Ques.map((i)=>(
    <div className="outlay">
<div className="question" key={i.id}>
<div className="qu">{i.body} 
{i.choices.map((k)=>(
const isvalidv = () => {
    return ( 
if(document.getElementById({k.id}.checked))

     );
}
 

))}
</div>
</div> 
</div>
))} */}
            </div>
        );
    }
return (

<div className='quiz'> <div className="viewquestions">
        <h2>Hobby Quiz</h2> 
        <h1>Prepared By: {Name}</h1>
       <div className='tag-list'>{Topics.map((i)=>(<span className='tag'>{i.Name} </span>
        ))}
        </div>
{Ques.map((i)=>(
    <div className="outlay">
<div className="question" key={i.id}>
<div className="qu">{i.body} 
{i.choices.map((k)=>(<div className="choices" key={k.name}>
    <input type="checkbox" name={k.body} id={k.id} /> {k.body}
    </div>))}
<p className='grade'>points: {i.grade}</p>
</div>
</div> 
</div>
))}
    </div>
    <div className='Submitbutton'>
<button onClick={handleClick}>Submit</button>
</div>
    </div>
 );
}
 
export default ViewQuiz;
