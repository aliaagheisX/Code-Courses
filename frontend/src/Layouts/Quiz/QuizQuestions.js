import { useState } from 'react';
import ViewQuiz from './ViewQuiz';

const  Questions =  () => {
const instructorName='Dr.hamada';
const [Topics]=useState([{Name:'favfood'},{Name:'favcolor'}]);
    
const [Ques] = useState([
    { body:'What is your favorite color?' ,choice1:'red',choice2:'green',choice3:'white',choice4:'black',grade:1, id:1 },
    { body:'What is your favorite food?' ,choice1:'mango',choice2:'salad',choice3:'fruit',choice4:'meat',grade:0.5,id:2 },
    { body:'What is your favorite drink?' ,choice1:'lemon',choice2:'apple',choice3:'soda',choice4:'fanta',grade:3,id:3 } 
]);

//console.log(Ques);
    return (
        <div className="questions">
<ViewQuiz Ques={Ques} Name={instructorName} Topics={Topics}/>
</div> );
}
 
export default Questions;