import { useContext, useState } from "react";
import { getCookieConsentValue } from "react-cookie-consent";
import * as ReactGA from "react-ga4";
import Animate from "./hooks/Animation";
import AppContext from "./hooks/createContext";
import SegmentOptions from "./SegmentOptions";
import { Box, Button, Paper } from "@mui/material";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import HighlightAltIcon from "@mui/icons-material/HighlightAlt";
import IndeterminateCheckBoxSharpIcon from "@mui/icons-material/IndeterminateCheckBoxSharp";
import AddBoxSharpIcon from "@mui/icons-material/AddBoxSharp";
interface SegmentDrawerProps {
  handleResetInteraction: (flag?: boolean) => void;
  handleUndoInteraction: () => void;
  handleRedoInteraction: () => void;
  handleCreateSticker: () => void;
  handleImage: (img?: HTMLImageElement) => void;
  userNegClickBool: [
    userNegClickBool: boolean,
    setUserNegClickBool: (e: boolean) => void
  ];
  showGallery: [showGallery: boolean, setShowGallery: (e: boolean) => void];
  hasClicked: boolean;
  handleNextImg: () => void;
  handleLastImg: () => void;
}

const SegmentDrawer = ({
  handleResetInteraction,
  handleUndoInteraction,
  handleRedoInteraction,
  handleCreateSticker,
  handleImage,
  userNegClickBool: [userNegClickBool, setUserNegClickBool],
  showGallery: [showGallery, setShowGallery],
  hasClicked,
  handleNextImg,
  handleLastImg,
}: SegmentDrawerProps) => {
  const {
    isModelLoaded: [isModelLoaded, setIsModelLoaded],
    segmentTypes: [segmentTypes, setSegmentTypes],
    isLoading: [isLoading, setIsLoading],
    isErased: [isErased, setIsErased],
    isMultiMaskMode: [isMultiMaskMode, setIsMultiMaskMode],
    stickers: [stickers, setStickers],
    activeSticker: [activeSticker, setActiveSticker],
    didShowAMGAnimation: [didShowAMGAnimation, setDidShowAMGAnimation],
    isAllAnimationDone: [isAllAnimationDone, setIsAllAnimationDone],
    isToolBarUpload: [isToolBarUpload, setIsToolBarUpload],
  } = useContext(AppContext)!;

  const [visibleClickHover, setVisibleClickHover] = useState<boolean>(false);
  const [visibleBoxHover, setVisibleBoxHover] = useState<boolean>(false);

  const [isClickCollapsed, setIsClickCollapsed] = useState(true);
  const [isBoxCollapsed, setIsBoxCollapsed] = useState(true);
  const [isClickMounted, setIsClickMounted] = useState(false);
  const [isBoxMounted, setIsBoxMounted] = useState(false);
  let clickTimeout: string | number | NodeJS.Timeout | undefined,
    boxTimeout: string | number | NodeJS.Timeout | undefined;

  return (
    <section className="flex-col hidden w-1/5 pt-[6%] overflow-y-auto md:flex lg:w-72">
      <Paper
        sx={{ margin: 1, height: "420px" }}
        elevation={6}
        // className={`shadow-[0px_0px_15px_5px_#00000024] rounded-xl md:mx-1 lg:mx-5`}
      >
        <div className="p-4 pt-5">
          <div className="flex justify-between p-2 pb-3">
            <span className="leading-3">工具栏</span>
          </div>

          <div
            onClick={() => {
              segmentTypes !== "Click" && handleResetInteraction();
              getCookieConsentValue("sa_demo") === "true" &&
                ReactGA.default.send({
                  category: "event",
                  action: "is_click",
                });
              clearTimeout(clickTimeout);
              setSegmentTypes("Click");
              setDidShowAMGAnimation(false);
            }}
            className={`transition-all overflow-hidden pb-2 ${
              segmentTypes !== "Click" &&
              (isClickCollapsed ? "max-h-[40px]" : "max-h-[85px]")
            } px-3 py-2 cursor-pointer rounded-xl ${
              segmentTypes === "Click"
                ? "outline-blue-700 outline outline-[2.5px]"
                : "outline outline-gray-200 "
            } `}
            style={{ outlineColor: segmentTypes === "Click" ? "#9c0c13" : "" }}
            onMouseEnter={() => {
              clearTimeout(clickTimeout);
              clickTimeout = setTimeout(() => {
                setIsClickCollapsed(false);
                setVisibleClickHover(true);
                setIsClickMounted(!isClickMounted);
              }, 700);
            }}
            onMouseLeave={() => {
              setIsClickCollapsed(true);
              setIsBoxCollapsed(true);
              // setVisibleClickHover(false);
              clearTimeout(clickTimeout);
              setIsClickMounted(false);
              setIsBoxMounted(false);
            }}
          >
            <div className="flex">
              {/* <svg
                width="17"
                height="24"
                viewBox="0 0 17 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 mr-2"
              >
                <path
                  d="M9.13635 23.8813C8.53843 24.1683 7.82091 23.9172 7.54586 23.3192L4.93889 17.6509L1.93729 20.0665C1.73399 20.2339 1.48286 20.3296 1.19586 20.3296C0.878697 20.3296 0.574526 20.2036 0.350259 19.9793C0.125992 19.7551 0 19.4509 0 19.1337V1.19586C0 0.878697 0.125992 0.574526 0.350259 0.350259C0.574526 0.125992 0.878697 0 1.19586 0C1.48286 0 1.75791 0.107627 1.96121 0.275047L1.97317 0.263089L15.7136 11.7912C16.2278 12.2217 16.2876 12.9751 15.869 13.4773C15.6897 13.6926 15.4385 13.8361 15.1874 13.8839L11.4085 14.6253L14.0394 20.2817C14.3503 20.8797 14.0633 21.5852 13.4654 21.8603L9.13635 23.8813Z"
                  fill={`${segmentTypes === "Click" ? "#9c0c13" : "#000000"}`}
                />
              </svg> */}
              <AdsClickIcon
                sx={{
                  color: segmentTypes === "Click" ? "#9c0c13" : "#000000",
                }}
              />
              <span
                className={`font-bold ${
                  segmentTypes === "Click" && "text-blue-600"
                }`}
                style={{
                  color: segmentTypes === "Click" ? "#9c0c13" : "#000000",
                  fontWeight: 700,
                  marginLeft: 4,
                }}
              >
                点选模式
              </span>
            </div>
            {/* {segmentTypes !== "Click" && visibleClickHover && (
              <Animate isMounted={isClickMounted}>
                <p
                  className="my-3 text-[11px] opacity-70"
                  style={{ fontSize: "0.75rem" }}
                >
                  点击一个位置创建一个选择点或者排除点
                </p>
              </Animate>
            )} */}
            {/* {segmentTypes === "Click" && ( */}
            <p
              style={{
                color: "#9c0c13",
                fontSize: "0.75rem",
                lineHeight: 1.5,
                opacity: 0.7,
                marginTop: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              点击一个位置创建一个选择点或者排除点
            </p>
            {/* )} */}
            <div className="flex justify-between mx-5 my-3">
              <div
                onClick={() => setUserNegClickBool(false)}
                className="flex flex-col items-center"
              >
                <AddBoxSharpIcon
                  sx={{ color: userNegClickBool ? "" : "#9c0c13" }}
                  fontSize="large"
                />
                {/* <p
                  className={`w-8 h-7 text-3xl leading-7 text-center align-middle rounded-lg mb-1 ${
                    userNegClickBool
                      ? "outline outline-1"
                      : "bg-blue-600 text-white"
                  }`}
                  style={{
                    backgroundColor: userNegClickBool ? "" : "#9c0c13",
                  }}
                >
                  +
                </p> */}
                <p
                  style={{
                    color: userNegClickBool ? "" : "#9c0c13",
                    fontSize: "0.75rem",
                    lineHeight: 1.5,
                    opacity: 0.7,
                    fontWeight: 700,
                  }}
                >
                  添加区域
                </p>
              </div>

              <div
                onClick={() => setUserNegClickBool(true)}
                className={`flex flex-col items-center ${
                  !hasClicked ? "disabled" : ""
                }`}
              >
                <IndeterminateCheckBoxSharpIcon
                  sx={{ color: !userNegClickBool ? "" : "#9c0c13" }}
                  fontSize="large"
                />
                {/* <p
                  className={`w-8 h-7 text-3xl leading-6 text-center align-middle rounded-lg mb-1 ${
                    userNegClickBool
                      ? "bg-blue-600 text-white"
                      : "outline outline-1"
                  }`}
                  style={{
                    backgroundColor: !userNegClickBool ? "" : "#9c0c13",
                    outlineWidth: !userNegClickBool ? "1px" : "0px",
                    outlineStyle: !userNegClickBool ? "solid" : "none",
                  }}
                >
                  -
                </p> */}
                <p
                  style={{
                    color: !userNegClickBool ? "" : "#9c0c13",
                    fontSize: "0.75rem",
                    lineHeight: 1.5,
                    opacity: 0.7,
                    fontWeight: 700,
                  }}
                >
                  移除区域
                </p>
              </div>
            </div>
            {/* {segmentTypes === "Click" && (

            )} */}
          </div>

          <div
            onClick={() => {
              segmentTypes !== "Box" && handleResetInteraction(true);
              getCookieConsentValue("sa_demo") === "true" &&
                ReactGA.default.send({
                  category: "event",
                  action: "is_box",
                });
              clearTimeout(boxTimeout);
              setIsMultiMaskMode(false);
              setSegmentTypes("Box");
              setDidShowAMGAnimation(false);
            }}
            className={`transition-all overflow-hidden ${
              segmentTypes !== "Box" &&
              (isBoxCollapsed ? "max-h-[40px]" : "max-h-[85px]")
            } my-2 rounded-xl px-4 py-2 cursor-pointer ${
              segmentTypes === "Box"
                ? "outline-blue-700 outline outline-[2.5px]"
                : "outline outline-gray-200"
            } `}
            style={{ outlineColor: segmentTypes === "Box" ? "#9c0c13" : "" }}
            onMouseEnter={() => {
              clearTimeout(boxTimeout);
              boxTimeout = setTimeout(() => {
                setIsBoxCollapsed(false);
                setVisibleBoxHover(true);
                setIsBoxMounted(true);
              }, 700);
            }}
            onMouseLeave={() => {
              setIsClickCollapsed(true);
              setIsBoxCollapsed(true);
              // setVisibleBoxHover(false);
              clearTimeout(boxTimeout);
              setIsClickMounted(false);
              setIsBoxMounted(false);
            }}
          >
            <div className="flex">
              {/* <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.7778 0H2.22222C1.63285 0 1.06762 0.234126 0.650874 0.650874C0.234126 1.06762 0 1.63285 0 2.22222V17.7778C0 18.3671 0.234126 18.9324 0.650874 19.3491C1.06762 19.7659 1.63285 20 2.22222 20H17.7778C18.3671 20 18.9324 19.7659 19.3491 19.3491C19.7659 18.9324 20 18.3671 20 17.7778V2.22222C20 1.63285 19.7659 1.06762 19.3491 0.650874C18.9324 0.234126 18.3671 0 17.7778 0ZM17.7778 17.7778H2.22222V2.22222H17.7778V17.7778ZM15.5556 15.5556H4.44444V4.44444H15.5556V15.5556Z"
                  fill={`${segmentTypes === "Box" ? "#9c0c13" : "#000000"}`}
                />
              </svg> */}
              <HighlightAltIcon
                sx={{ color: segmentTypes === "Box" ? "#9c0c13" : "#000000" }}
              />
              <span
                style={{
                  paddingLeft: "0.5rem",
                  color: segmentTypes === "Box" ? "#9c0c13" : "#000000",
                  fontWeight: 700,
                }}
              >
                框选模式
              </span>
            </div>
            {segmentTypes !== "Box" && visibleBoxHover && (
              <Animate isMounted={isBoxMounted}>
                <p className="my-3 text-xs opacity-70">绘制一个矩形选择区域</p>
              </Animate>
            )}
            {segmentTypes === "Box" && (
              <p
                style={{
                  color: "#9c0c13",
                  fontSize: "0.75rem",
                  lineHeight: 1.5,
                  opacity: 0.7,
                  marginTop: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                绘制一个矩形选择区域
              </p>
            )}

            {/* {segmentTypes === "Box" && (
              <SegmentOptions
                handleResetInteraction={handleResetInteraction}
                handleUndoInteraction={handleUndoInteraction}
                handleRedoInteraction={handleRedoInteraction}
                handleCreateSticker={handleCreateSticker}
                handleImage={handleImage}
                hasClicked={hasClicked}
              />
            )} */}
          </div>
          <SegmentOptions
            handleResetInteraction={handleResetInteraction}
            handleUndoInteraction={handleUndoInteraction}
            handleRedoInteraction={handleRedoInteraction}
            handleCreateSticker={handleCreateSticker}
            handleImage={handleImage}
            hasClicked={hasClicked}
          />
        </div>
      </Paper>
      <Box sx={{ display: "flex", justifyContent: "space-around", margin: 3 }}>
        <Button variant="contained" onClick={handleLastImg}>
          上一张
        </Button>
        <Button variant="contained" onClick={handleNextImg}>
          下一张
        </Button>
      </Box>
    </section>
  );
};

export default SegmentDrawer;
