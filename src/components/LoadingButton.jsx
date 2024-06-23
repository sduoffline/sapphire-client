import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import SaveIcon from "@mui/icons-material/Save";
import { Tooltip } from "@mui/material";

export default function ImgLoadingButton(props) {
  /**
   * isSuccess:加载情况
   * showRight:
   * titlel:左边hover标题
   * clickl:点击左侧函数
   * isFetching
   * litleTitle:右侧hover语句
   * clickr:右侧函数
   * titler：右侧title
   */

  const buttonSx = {
    ...(props?.isSuccess && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      {props?.showLeft && (
        <Box sx={{ m: 1, position: "relative" }}>
          <Tooltip title={props?.titlel}>
            <Fab
              aria-label="save"
              color="primary"
              size="small"
              sx={buttonSx}
              onClick={props?.clickl}
            >
              {props?.isSuccess ? <CheckIcon /> : <SaveIcon />}
            </Fab>
          </Tooltip>
          {props?.isFetching && (
            <CircularProgress
              size={46}
              sx={{
                color: green[500],
                position: "absolute",
                top: -3,
                left: -3,
                zIndex: 1,
              }}
            />
          )}
        </Box>
      )}
      <Tooltip title={props?.litleTitle}>
        <Box sx={{ m: 1, position: "relative" }}>
          <Button
            variant="contained"
            sx={buttonSx}
            disabled={props?.isFetching}
            onClick={props?.clickr}
            endIcon={props?.endIcon}
          >
            {props?.titler}
          </Button>
          {props?.isFetching && (
            <CircularProgress
              size={24}
              sx={{
                color: green[500],
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Box>
      </Tooltip>
    </Box>
  );
}
