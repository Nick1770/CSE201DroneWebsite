import { useEffect, useState } from 'react'
import callAPI from '../../api/fetch'

const Members = () => {
    const [members, setMembers] = useState([])

    useEffect(() => {
        callAPI('/users', 'GET')
            .then(res => res.json())
            .then(json => setMembers(json.users))
    }, [])

    return (
        <>
            <h1>Members</h1>
            <ul>
                { members.map(m => 
                    <li key={m.id}>{m.fName} {m.lName}</li>
                )}
            </ul>
        </>
    )
}

export default Members