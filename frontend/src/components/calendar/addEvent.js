import { useState } from "react"

const AddEvent = ({ onSubmit }) => {
    const [title, setTitle] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        let newEvent = {
            id: 0,
            title,
            start: date + 'T' + time
        }
        // TODO: add to database
        onSubmit(newEvent)
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">event name</label>
            <input id="title" type="text" value={title} required
                onChange={e => setTitle(e.target.value)}/>
            
            <label htmlFor="start">event name</label>
            <input id="date" type="date" value={date} required
                onChange={e => setDate(e.target.value)}/>

            <label htmlFor="time">event name</label>
            <input id="time" type="time" value={time} required
                onChange={e => setTime(e.target.value)}/>

            <input type="submit" value="add"/>
        </form>
    )
}

export default AddEvent