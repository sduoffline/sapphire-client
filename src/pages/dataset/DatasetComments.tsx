import React, { useEffect } from "react";
import CommentArea from "../../components/CommentArea";
import { Avatar, Box, Divider, Paper, Typography } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postQueryFn } from "../../queries/postQueryFn";
import { get_comments_url } from "../../constants/url";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export default function DatasetComments({ datasetId }: { datasetId: any }) {
  const { mutate, isSuccess, isPending, data } = useMutation({
    mutationFn: postQueryFn,
  });
  const fetchComments = () => {
    mutate({
      url: get_comments_url + "/" + datasetId,
    });
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <div>
      <Box
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            ml: 6,
            width: "70%",
            minWidth: "500px",
            maxWidth: "800px",
          }}
        >
          {isSuccess &&
            data.data.data?.map((value: any) => (
              <Paper elevation={8} sx={{ p: 2, marginBottom: "20px" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <Avatar alt={value.userName} src={value.avatar}></Avatar>
                  <Box
                    sx={{
                      marginLeft: "10px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography sx={{ fontWeight: "550" }}>
                      {value.userName}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ padding: "10px", mt: 2, mb: 2 }}>
                  <Typography>{value.content}</Typography>
                </Box>
                <Divider />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <AccessTimeOutlinedIcon color="primary" />
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#827e7e",
                      margin: "5px 0 5px 3px",
                    }}
                  >
                    {value.time}
                  </Typography>
                  <Box sx={{ flexGrow: 1 }}></Box>
                </Box>
              </Paper>
            ))}
          <CommentArea action={fetchComments} datasetId={datasetId} />
        </Box>
      </Box>
    </div>
  );
}
