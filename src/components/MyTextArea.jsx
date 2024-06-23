import { CssVarsProvider, StyledEngineProvider, Textarea } from "@mui/joy";
import { useTheme } from "@mui/material";
import { useContext } from "react";
import { useEffect } from "react";
import { ThemeColorContext } from "../App";

export default function MyTextarea(props) {
  const theme = useTheme();

  useEffect(() => {
    window.document
      .getElementsByTagName("html")[0]
      .setAttribute("data-joy-color-scheme", theme.palette.mode);
  }, [theme.palette.mode]);

  // const themeColor = useContext(ThemeColorContext);

  return (
    <CssVarsProvider>
      <StyledEngineProvider injectFirst>
        <Textarea
          placeholder={props?.placeholder}
          value={props.value}
          onChange={(e) => props.change(e.target.value)}
          minRows={3}
          // color={
          //   themeColor.themeColor == 0
          //     ? "primary"
          //     : themeColor.themeColor == 1
          //     ? "info"
          //     : themeColor.themeColor == 2
          //     ? "success"
          //     : "danger"
          // }
        />
      </StyledEngineProvider>
    </CssVarsProvider>
  );
}
