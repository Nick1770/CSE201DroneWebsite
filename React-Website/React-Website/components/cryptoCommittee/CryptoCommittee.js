import React from "react";
import {
  Grid,
  Typography,
  Divider,
  Box,
  Button,
  Link,
} from "@material-ui/core";

const CryptoCommittee = () => {
  return (
    <div id="Crypto Committee">
      <Grid container>
        <Grid item xs={1} />
        <Grid item container justifyContent="center" xs={10}>
          <Typography style={{ marginBottom: 10 }} variant="h1">
            <Box fontWeight="fontWeightBold">MUDR Racing Team</Box>
          </Typography>
          <Typography variant="h3" style={{ marginBottom: 10 }}>
            Student-Run Drone Club
          </Typography>
          <Typography style={{ marginBottom: 10 }} variant="h3">
            <Box fontWeight="fontWeightBold"> </Box>
          </Typography>
          <Typography variant="body1">
            What we do...
          </Typography>
          <Grid item container justifyContent="center">
            <Button
              style={{ marginTop: 20 }}
              variant="contained"
              color="primary"
              size="large"
            >
              <Link
                color="inherit"
                href="https://forms.gle/11vEm41fqQve4QtC9"
                rel="noopener"
                target="_blank"
              >
                Apply
              </Link>
            </Button>
          </Grid>
          <Divider style={{ width: "100%", marginTop: 25, marginBottom: 10 }} />
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </div>
  );
};

export default CryptoCommittee;
