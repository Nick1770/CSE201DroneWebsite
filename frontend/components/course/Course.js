import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Link,
  Button,
  Box,
} from "@material-ui/core";

import CourseCard from "./CourseCard";

const renderBullet = (bullets) => {
  return bullets.map((bullet, index) => {
    return <li key={index}>{bullet}</li>;
  });
};

const Course = () => {
  const topics = renderBullet([
    "Learn to fly",
    "How to build",
    "How to repair after a crash",
  ]);

  return (
    <div id="Course">
      <Grid container>
        <Grid item xs={1} />
        <Grid item container justifyContent="center" xs={10}>
          <Typography variant="h1">
            <Box fontWeight="fontWeightBold">Drone racing</Box>
          </Typography>
          <Typography style={{ marginBottom: 10 }} variant="h3">
            Introduction to drone racing
          </Typography>
          <CourseCard
            title="Logistics"
            buttons={
              <>
                <Button variant="contained" color="primary" size="small">
                  <Link
                    color="inherit"
                    href="https://docs.google.com/document/d/1p1JkcskOG-lpIpPxXNWcISwII0ln84-7X78q0RlIRVw/edit?usp=sharing"
                    rel="noopener"
                    target="_blank"
                  >
                    Learn More
                  </Link>
                </Button>
              </>
            }
          >
            <li>Pilots: Miami University Drone Club Leaders</li>
            <li>Advisors: Dr. Something?</li>
            <li>
              Email:{" "}
              <Link href="mailto:MUDR@miamioh.edu" rel="noopener">
                MUBC@miamioh.edu
              </Link>
            </li>
            <li>
              Meeting Times: Wednesdays from 6:00 - 7:00 PM in Benton (In-person)
            </li>
          </CourseCard>
          <CourseCard title="Description">
            Come learn to fly drones! Learn the steps to get commercial certification
          </CourseCard>
          <CourseCard title="Topics">{topics}</CourseCard>
          <Divider style={{ width: "100%", marginTop: 25, marginBottom: 10 }} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export default Course;
