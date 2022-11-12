import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import listPlugin from "@fullcalendar/list";
import { Grid, Typography, Divider, Hidden, Box } from "@material-ui/core";

import "./style.css";

const Calendar = (props) => {
  const { darkMode } = props;
  const events = [
    
    {
      title: "Welcome to drone club",
      start: "2022-11-16T18:00:00",
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
    }

  ];

  const eventClick = function (info) {
    info.jsEvent.preventDefault();

    if (info.event.url) {
      window.open(info.event.url);
    }
  };

  return (
    <div id="Calendar">
      <Grid container>
        <Grid item xs={1} />
        <Grid item container justifyContent="center" xs={10}>
          <Typography style={{ marginBottom: 10 }} variant="h1">
            <Box fontWeight="fontWeightBold">Calendar</Box>
          </Typography>
          <Hidden xsDown={true}>
            <FullCalendar
              dayHeaderClassNames={darkMode ? "fc-widget-header" : ""}
              height="auto"
              plugins={[dayGridPlugin]}
              initialView={"dayGridMonth"}
              events={events}
              eventClick={eventClick}
              eventColor="#c62828"
              eventDisplay="block"
              displayEventEnd={true}
            />
          </Hidden>
          <Hidden smUp={true}>
            <FullCalendar
              height="auto"
              plugins={[listPlugin]}
              initialView={"listMonth"}
              events={events}
              eventClick={eventClick}
              eventColor="#c62828"
              eventDisplay="block"
              displayEventEnd={true}
            />
          </Hidden>
          <Divider style={{ width: "100%", marginTop: 25, marginBottom: 10 }} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export default Calendar;