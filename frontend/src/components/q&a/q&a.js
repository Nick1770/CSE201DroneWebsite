import { useEffect, useState } from "react"
import callAPI from "../../api/fetch"
import useAuth from "../../hooks/useAuth"

const QAndA = () => {
    const { auth } = useAuth()
    const [comments, setComments] = useState([])
    const [question, setQuestion] = useState([])

    useEffect(() => {
        callAPI('/questions', 'GET')
            .then(res => res.json())
            .then(json => {
                console.log(json)
                return json
            })
            .then(json => setComments(json.QandA))
    }, [])

    const handleSubmitQuestion = e => {
        e.preventDefault()
        callAPI('/questions', 'POST', {
            user_id: auth?.id,
            content: question
        }).then(res => {
            if (res.status === 201) {
                setQuestion('')
                alert('Your question has been submitted and will be answered shortly.')
            }
        })
    }

    return (
        <>
            <h1>Q&A</h1>

            { auth ? <form onSubmit={handleSubmitQuestion}>
                <label htmlFor="question">Question</label>
                <textarea id="question" type="text" value={question} onChange={e => setQuestion(e.target.value)}/>

                <input type="submit" value="Ask!"/>
            </form> : ""}

            <br/>
            { comments.map(c =>
            <>
                <div key={c.id} className="questions-and-answers">
                    <div className="question"><b>Q:</b> {c.content}</div>
                    <div className="answer"><b>A:</b> {c.answer}</div>
                </div>
                <br/>
            </>
            )}
        </>
    )
}

export default QAndA