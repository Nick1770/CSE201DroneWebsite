import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
import AddEvent from "./addEvent";
import useAuth from "../../hooks/useAuth";
import callAPI from "../../api/fetch";
import "./calendar.css"

const Calendar = (props) => {
    // const { darkMode } = props;
    const [events, setEvents] = useState([])
    const { auth, hasRole } = useAuth()
    
    const getEvents = async (start, end) => {
      start = start.toISOString().split('.')[0]
      end = end.toISOString().split('.')[0]
      const response = await callAPI(`/events?startDate=${start}&endDate=${end}`, 'GET')
      const { events } = await response.json()
      setEvents(events)
    }

    const handleDateSet = (args) => {
      getEvents(args.start, args.end)
    }

    const handleAddEvent = async (event) => {
      const res = await callAPI('/events', 'POST', event)
      const json = await res.json()
      event.id = json.id
      setEvents(prev => [...prev, event])
    }
  
    const eventClick = async (info) => {
      info.jsEvent.preventDefault();

      if (auth && window.confirm(`Are you sure you want to delete this event? ${info.event.title}`)) {
        await callAPI(`/events/${info.event.id}`, 'DELETE')
        setEvents(prev => prev.filter(e => e.id !== parseInt(info.event.id)))
      }
    };
  
    return (
      <div id="Calendar">
        <h1>Calendar</h1>
        <FullCalendar
          dayHeaderClassNames="fc-widget-header"
          height="auto"
          plugins={[dayGridPlugin]}
          initialView={"dayGridMonth"}
          events={events}
          eventClick={eventClick}
          eventColor="#c62828"
          eventDisplay="block"
          displayEventEnd={true}
          datesSet={handleDateSet}
          />
        
        {
          hasRole('ADMIN') ? <AddEvent onSubmit={handleAddEvent}/> : ""
        }
    </div>
    );
  };
  
  export default Calendar;