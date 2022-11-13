import { useEffect, useState } from "react"

const Attendance = () => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        setMembers([
            {
                id: 0,
                name: 'will',
                isHere: true
            },
            {
                id: 1,
                name: 'nick',
                isHere: false
            }
        ])
    }, [])

    const handleCheckbox = (e, i) => {
        setMembers(prev => {
            prev[i].isHere = e.target.checked
            return [...prev]
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(members)
    }

    return (
        <>
            <h1>Attendance</h1>

            <form onSubmit={handleSubmit}>
                <ul>
                    { members.map((m, i) => 
                        <li key={m.id}>
                            {m.name}
                            <input type="checkbox" checked={m.isHere} onChange={(e) => handleCheckbox(e, i)}/>
                        </li>
                    )}
                </ul>
                <input type="submit"/>
            </form>

        </>
    )
}

export default Attendance