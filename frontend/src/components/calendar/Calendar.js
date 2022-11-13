import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useState } from "react";
import AddEvent from "./addEvent";
import useAuth from "../../hooks/useAuth";

const Calendar = (props) => {
    // const { darkMode } = props;
    const [events, setEvents] = useState([])
    const { hasRole } = useAuth()
    
    const getEvents = () => {
      setEvents([
      {
        title: "Welcome to drone club",
        start: "2022-11-16T18:00:00",
        id: 0
      },
  
      {
        title: "First fly",
        start: "2022-11-20T18:00:00",
      },
  
      {
        title: "Drone workshop",
        start: "2022-11-23T18:00:00",
      },
  
      {
        title: "Drone race 1",
        start: "2022-11-27T18:00:00",
      },
  
      {
        title: "Drone workshop",
        start: "2022-11-30T18:00:00",
      }])
    }

    const handleDateSet = (args) => {
      console.log(args)
      getEvents()
    }

    const handleAddEvent = (event) => {
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