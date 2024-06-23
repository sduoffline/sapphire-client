import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";
import {
  StyledEngineProvider,
  CssVarsProvider,
  useColorScheme,
} from "@mui/joy/styles";
import { useEffect } from "react";
import { useTheme } from "@mui/system";
import { useContext } from "react";
import { useMutation } from "@tanstack/react-query";
import { postQueryFn } from "../queries/postQueryFn";
import { put_comment_url } from "../constants/url";
import { useSnackbar } from "notistack";
// import { ThemeColorContext } from "../App";
// import { CssVarsProvider } from "@mui/joy/styles";

export default function CommentArea(props) {
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [msg, setMsg] = React.useState("");
  const { mutate, isSuccess, isError, data, isPending } = useMutation({
    mutationFn: postQueryFn,
  });
  const upload = () => {
    mutate({
      url: put_comment_url,
      method: "post",
      data: {
        title: "",
        content: msg,
        datasetId: props.datasetId,
      },
    });
  };

  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data);
      enqueueSnackbar("发表成功", { variant: "success" });
      props.action();
      setMsg("");
    }
  }, [isSuccess]);
  return (
    // <CssVarsProvider>
    <CssVarsProvider>
      <StyledEngineProvider injectFirst>
        <FormControl>
          <Textarea
            value={msg}
            // color="black"
            // sx={{ bgcolor: "dark" }}
            placeholder={"说出你对这个数据集的印象"}
            minRows={3}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            // color={
            //   themeColor.themeColor == 0
            //     ? "primary"
            //     : themeColor.themeColor == 1
            //     ? "info"
            //     : themeColor.themeColor == 2
            //     ? "success"
            //     : "danger"
            // }
            color="danger"
            endDecorator={
              <Box
                sx={{
                  display: "flex",
                  gap: "var(--Textarea-paddingBlock)",
                  pt: "var(--Textarea-paddingBlock)",
                  borderTop: "1px solid",
                  borderColor: "divider",
                  flex: "auto",
                }}
              >
                <IconButton
                  variant="plain"
                  color="neutral"
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <FormatBold />
                  <KeyboardArrowDown fontSize="md" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => setAnchorEl(null)}
                  size="sm"
                  placement="bottom-start"
                  sx={{ "--List-decorator-size": "24px" }}
                >
                  {["200", "normal", "bold"].map((weight) => (
                    <MenuItem
                      key={weight}
                      selected={fontWeight === weight}
                      onClick={() => {
                        setFontWeight(weight);
                        setAnchorEl(null);
                      }}
                      sx={{ fontWeight: weight }}
                    >
                      <ListItemDecorator>
                        {fontWeight === weight && <Check fontSize="sm" />}
                      </ListItemDecorator>
                      {weight === "200" ? "lighter" : weight}
                    </MenuItem>
                  ))}
                </Menu>
                <IconButton
                  variant={italic ? "soft" : "plain"}
                  color={italic ? "primary" : "neutral"}
                  aria-pressed={italic}
                  onClick={() => setItalic((bool) => !bool)}
                >
                  <FormatItalic />
                </IconButton>
                <Button
                  sx={{ ml: "auto", zIndex: 1000 }}
                  // color={
                  //   themeColor.themeColor == 0
                  //     ? "primary"
                  //     : themeColor.themeColor == 1
                  //     ? "info"
                  //     : themeColor.themeColor == 2
                  //     ? "success"
                  //     : "danger"
                  // }
                  color="danger"
                  variant="outlined"
                  disabled={isPending}
                  onClick={upload}
                >
                  {isPending ? "正在发送" : "发送"}
                </Button>
              </Box>
            }
            sx={{
              minWidth: 300,
              fontWeight,
              fontStyle: italic ? "italic" : "initial",
            }}
          />
        </FormControl>
      </StyledEngineProvider>
    </CssVarsProvider>
    // </CssVarsProvider>
  );
}
