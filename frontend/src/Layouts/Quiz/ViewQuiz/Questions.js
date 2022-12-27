export default function Questions({ Ques, Name, Topics }) {
    console.log(Topics)
    const handleClick = () => {
        return (
            <div>

            </div>
        );
    }
    return (

        <div className='quiz'> <div className="viewquestions">
            {Ques.map((i, ind) => (
                <div key={ind} className="outlay">
                    <div className="question" key={i.id}>
                        <div className="qu">{i.body}
                            {i.choices.map((k) => (<div className="choices" key={k.name}>
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