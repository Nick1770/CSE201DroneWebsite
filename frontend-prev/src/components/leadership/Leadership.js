import React from "react";
import { Typography, Grid, Divider, Box } from "@material-ui/core";
import ProfileCard from "./ProfileCard";
import nickDiSistoPicture from "./images/Nick_DiSisto.jpg";

const Leadership = () => {
  return (
    <div id="Leadership">
      <Grid container>
        <Grid item xs={1} />
        <Grid item container justifyContent="center" xs={10}>
          <Typography style={{ marginBottom: 10 }} variant="h1">
            <Box fontWeight="fontWeightBold">Leadership</Box>
          </Typography>
          <Grid container justifyContent="center">
            <ProfileCard
              profilePicture={nickDiSistoPicture}
              title="Nick DiSisto - President"
              description="Drone club presedent"
            />
            
            <Divider
              style={{ width: "100%", marginTop: 25, marginBottom: 10 }}
            />
          </Grid>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export default Leadership;