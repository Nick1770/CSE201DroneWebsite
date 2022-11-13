import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
import AddEvent from "./addEvent";
import useAuth from "../../hooks/useAuth";
import callAPI from "../../api/fetch";

const Calendar = (props) => {
    // const { darkMode } = props;
    const [events, setEvents] = useState([])
    const { hasRole } = useAuth()
    
    const getEvents = async () => {
      const response = await callAPI('/events', 'GET')
      const { events } = await response.json()
      console.log(events)
      setEvents(events)
    }

    const handleDateSet = (args) => {
      console.log(args)
      getEvents()
    }

    const handleAddEvent = async (event) => {
      await callAPI('/events', 'POST', event)
      setEvents(prev => [...prev, event])
    }
  
    const eventClick = function (info) {
      info.jsEvent.preventDefault();
  
      if (info.event.url) {
        window.open(info.event.url);
      }

      console.log('clicked on event')
      console.log(info.event.id)
      // TODO: open popup to delete event if user is admin
    };
  
    return (
      <div id="Calendar">
        <h1>Calendar</h1>
        <FullCalendar
          // dayHeaderClassNames={darkMode ? "fc-widget-header" : ""}
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