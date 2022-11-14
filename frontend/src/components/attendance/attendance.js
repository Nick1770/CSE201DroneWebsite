import { useEffect, useState } from "react"
import callAPI from "../../api/fetch"

const Attendance = () => {
    const [members, setMembers] = useState([])
    const [date, setDate] = useState(new Date().toISOString().substring(0, 10))

    useEffect(() => {
        getAttendance()
    }, [date])

    const getAttendance = () => {
        callAPI(`/attendance?onDate=${date}`, 'GET')
            .then(async res => {
                if (res.status !== 200) return;
                const json = await res.json()
                setMembers(json.attendance)
            })
    }

    const handleDateChange = (e) => {
        setDate(e.target.value)
    }

    const handleCheckbox = (e, i) => {
        setMembers(prev => {
            prev[i].absent = !e.target.checked
            callAPI('/attendance', 'PATCH', {
                userId: prev[i].id,
                date,
                absent: prev[i].absent
            })
            return [...prev]
        })
    }

    return (
        <>
            <h1>Attendance</h1>

            <form>
                <input type="date" value={date} onChange={e => handleDateChange(e)}/>
                <ul>
                    { members ? members.map((m, i) => 
                        <li key={m.id}>
                            <input id={m.id} type="checkbox" checked={!m.absent} onChange={(e) => handleCheckbox(e, i)}/>
                            <label htmlFor={m.id}>{m.fName} {m.lName}</label>
                        </li>
                    ) : ""
                    }
                </ul>
            </form>

        </>
    )
}

export default Attendance