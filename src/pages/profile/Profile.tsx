import { Avatar, Box, Container, Grid, Typography } from "@mui/material";
import HistoryInfoPanel from "./HistoryInfoPanel";
import StatusPanel from "./StatusPanel";
import DayHeatmap from "../../components/DayHeatMap";
import { useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { queryFn } from "../../queries/queryFn";
import { get_user_info } from "../../constants/url";
import { grey } from "@mui/material/colors";
import { useState } from "react";

export default function Profile() {
  const [params, setParams] = useSearchParams();
  const [id, setId] = useState(
    params.get("id") ?? localStorage.getItem("userId")
  );
  const { isLoading, isSuccess, data } = useQuery({
    queryKey: [
      `${get_user_info}/${params.get("id") ?? localStorage.getItem("userId")} `,
    ],
    queryFn: queryFn,
  });

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
          {isSuccess && (
            <div>
              <Avatar
                src={data.data.data.avatar}
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
                {data.data.data.name}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "center",
                }}
                color={grey[500]}
              >
                {data.data.data.description}
              </Typography>
            </div>
          )}
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container sx={{ marginTop: 2, marginBottom: 2 }}>
          {isSuccess && <StatusPanel dataset={data?.data.data} />}
        </Container>
      </Grid>

      <Grid item xs={12}>
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          <DayHeatmap type="user" id={id} />
        </Container>
      </Grid>

      <Grid item xs={12}>
        <Container sx={{ marginTop: 3 }}>
          <HistoryInfoPanel id={id} />
        </Container>
      </Grid>
    </Grid>
  );
}
