import { useEffect, useState } from "react"
import callAPI from "../../api/fetch"

const Questions = () => {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        callAPI('/questions/toanswer', 'GET')
            .then(res => res.json())
            .then(json => setQuestions(json.questions))
    }, [])
    
    const handleAnswerClick = (questionId, index) => {
        const answer = prompt('What is your answer?')
        callAPI(`/questions/${questionId}/answer`, 'POST', { answer })
        setQuestions(prev => {
            prev[index].answer = answer;
            return [...prev]
        })
    }

    const handleAnswerReset = (questionId, index) => {
        callAPI(`/questions/${questionId}`, 'DELETE')
        setQuestions(prev => {
            prev[index].answer = null;
            return [...prev]
        })
    }

    return (
        <>
            <h1>Answer Questions:</h1>
            { questions.map((q, i) => 
            <>
                <div key={q.id} className="questions-and-answers">
                    <div className="question"><b>Q:</b> {q.content}</div>
                    <div className="answer"><b>A:</b> {q.answer}</div>
                    <button onClick={() => handleAnswerClick(q.id, i)}>Answer</button>
                    {q.answer ? <button onClick={() => handleAnswerReset(q.id, i)}>Remove</button>:""}
                </div>    
                <br/>
            </>
            )}
        </>
    )
}

export default Questions