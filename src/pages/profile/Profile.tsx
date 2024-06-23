import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import HistoryInfoPanel from "./HistoryInfoPanel";
import StatusPanel from "./StatusPanel";
import DayHeatmap from "../../components/DayHeatMap";

export default function Profile() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Container
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            <Avatar
              src="https://cloud.icooper.cc/apps/sharingpath/PicSvr/PicMain/Sapphire_transparentbg.png"
              sx={{
                width: 128,
                height: 128,
                border: "2px solid #fff",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                // hover时放大并添加阴影
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                  transition: "all 0.3s",
                },
              }}
            />
            <div style={{ height: 16 }} />
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
              }}
            >
              Sapphire
            </Typography>
          </div>
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
          <StatusPanel />
        </Container>
      </Grid>
      {/* <Grid item xs={12}>
        <Container><HistoryInfoPanel /></Container>
      </Grid> */}
      <Grid item xs={12}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <DayHeatmap type="user" id={localStorage.getItem("userId")} />
        </Container>
      </Grid>
    </Grid>
  );
}
