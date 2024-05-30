/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { InferenceSession, Tensor } from "onnxruntime-web";
import React, { useContext, useEffect, useRef, useState } from "react";

import getFile from "../../components/helpers/getFile";
import { handleImageScale } from "../../components/helpers/ImageHelper";
import { modelScaleProps } from "../../components/helpers/Interface";
import {
  rleToImage,
  traceOnnxMaskToSVG,
} from "../../components/helpers/mask_utils";
import {
  modelData,
  setParmsandQueryModel,
} from "../../components/helpers/modelAPI";
import AppContext from "../../components/hooks/createContext";
import * as ort from "onnxruntime-web";

import Stage from "../../components/Stage";
import { Box, Paper } from "@mui/material";
ort.env.debug = false;
ort.env.logLevel = "verbose";

ort.env.wasm.numThreads = 2;
ort.env.wasm.simd = true;
ort.env.wasm.wasmPaths = {
  "ort-wasm.wasm": "/ort-wasm.wasm",
  "ort-wasm-simd.wasm": "/ort-wasm-simd.wasm",
  "ort-wasm-threaded.wasm": "/ort-wasm-threaded.wasm",
  "ort-wasm-simd-threaded.wasm": "/ort-wasm-simd-threaded.wasm",
};

// ort.env.webgl.pack = true;

interface WorkToolsProps {
  handleNextImg: () => void;
  handleLastImg: () => void;
  imgUrl: string | null;
  embeddingUrl: string | null;
  imgs: { imgUrl: string; embeddingUrl: string }[];
  info: {
    dataSetId: number;
    dataSetName: string;
    taskInfo: string;
    objectCnt: number; //目标种类数量
    objects: string[]; //目标种类列表
  };
  updateData: (pos: number, data: {}[]) => void;
  pos: [number, (e: number) => void];
}

export default function WorkTools({
  handleLastImg,
  handleNextImg,
  imgUrl,
  embeddingUrl,
  imgs,
  updateData,
  info,
  pos: [nowPos, setPos],
}: WorkToolsProps) {
  useEffect(() => {
    console.log(imgUrl);
  }, []);
  const {
    click: [click, setClick], //当前的点击位置（追踪鼠标位置）
    clicks: [clicks, setClicks], //全部的点击位置数组
    image: [image, setImage], //需要被推理的数组
    prevImage: [prevImage, setPrevImage], //此前的图片，用于重置操作
    svg: [, setSVG], //蒙版svg
    svgs: [svgs, setSVGs], //全部的蒙版svg
    allsvg: [, setAllsvg],
    isErased: [, setIsErased], //是否被擦除
    isModelLoaded: [, setIsModelLoaded], //模型是否加载
    isLoading: [, setIsLoading], //是否正在加载图片和embedding
    segmentTypes: [, setSegmentTypes], //当前的分割类型
    maskImg: [, setMaskImg], //蒙版图片
    isErasing: [isErasing, setIsErasing], //是否正在擦除
    stickerTabBool: [stickerTabBool, setStickerTabBool],
    isMultiMaskMode: [isMultiMaskMode, setIsMultiMaskMode], //
    isHovering: [isHovering, setIsHovering],
    showLoadingModal: [showLoadingModal, setShowLoadingModal],
    eraserText: [eraserText, setEraserText],
    predMask: [predMask, setPredMask], //之前的蒙版
    predMasks: [predMasks, setPredMasks],
    predMasksHistory: [predMasksHistory, setPredMasksHistory],
    isToolBarUpload: [isToolBarUpload, setIsToolBarUpload],
    stickers: [stickers, setStickers], //所有扣完的元素
  } = useContext(AppContext)!;
  const [model, setModel] = useState<InferenceSession | null>(null);
  const [multiMaskModel, setMultiMaskModel] = useState<InferenceSession | null>(
    null
  );
  const [tensor, setTensor] = useState<Tensor | null>(null);
  const [hasClicked, setHasClicked] = useState<boolean>(false);
  const [mask, setMask] = useState<
    | string[]
    | Uint8Array
    | Float32Array
    | Int8Array
    | Uint16Array
    | Int16Array
    | Int32Array
    | BigInt64Array
    | Float64Array
    | Uint32Array
    | BigUint64Array
    | null
  >(null);
  const [modelScale, setModelScale] = useState<modelScaleProps | null>(null);

  useEffect(() => {
    if (imgUrl && embeddingUrl)
      handleSelectedImage(imgUrl, embeddingUrl, {
        shouldDownload: false,
        shouldNotFetchAllModel: true,
      });
    setStickers([]);
  }, [imgUrl, embeddingUrl]);

  useEffect(() => {
    const initModel = async () => {
      try {
        // if (process.env.MODEL_DIR === undefined) return;
        const MODEL_DIR =
          "./interactive_module_quantized_592547_2023_03_19_sam6_long_uncertain.onnx";
        const URL: string = MODEL_DIR;
        // const URL: string = process.env.MODEL_DIR;

        const model = await InferenceSession.create(URL);

        // console.log('ENV', ort.env.wasm.wasmPaths)

        setModel(model);
      } catch (e) {
        // console.log("MODEL:", e);
        console.error(e);
      }
      try {
        // console.log("MULTI MASK MODEL");
        // if (process.env.MULTI_MASK_MODEL_DIR === undefined) return;
        const MULTI_MASK_MODEL_DIR =
          "./interactive_module_quantized_592547_2023_03_20_sam6_long_all_masks_extra_data_with_ious.onnx";
        const URL2: string = MULTI_MASK_MODEL_DIR;
        // console.log("MULTI MASK MODEL URL:", URL2);
        // const URL2: string = process.env.MULTI_MASK_MODEL_DIR;
        const multiMaskModel = await InferenceSession.create(URL2);
        // console.log("multiMaskModel:", multiMaskModel);
        setMultiMaskModel(multiMaskModel);
      } catch (e) {
        // console.log("MULTI MASK MODEL:", e);
        console.error(e);
      }
    };
    initModel();
  }, []);

  const runModel = async () => {
    // console.log("Running singleMaskModel");
    try {
      if (
        model === null ||
        clicks === null ||
        tensor === null ||
        modelScale === null
      )
        return;
      if (stickerTabBool) return;
      const feeds = modelData({
        clicks,
        tensor,
        modelScale,
        last_pred_mask: predMask,
      });
      if (feeds === undefined) return;
      const results = await model.run(feeds);
      const output = results[model.outputNames[0]];
      if (hasClicked) {
        const pred_mask = results[model.outputNames[1]];
        setPredMask(pred_mask);
        if (!predMasksHistory) {
          setPredMasks([...(predMasks || []), pred_mask]);
        }
        const svgStr = traceOnnxMaskToSVG(
          output.data,
          output.dims[1],
          output.dims[0]
        );
        setSVG(svgStr);
        setMask(output.data);
      } else {
        setMaskImg(rleToImage(output.data, output.dims[0], output.dims[1]));
      }
      setClick(null);
      setIsLoading(false);
      setIsModelLoaded((prev) => {
        return { ...prev, boxModel: true };
      });
      // console.log("boxModel is loaded");
    } catch (e) {
      // console.log(e);
    }
  };

  useEffect(() => {
    // TODO: By default use the runModel function
    // When the multi mask mode is enabled, run runMultiMaskModel
    const runOnnx = async () => {
      runModel();
    };
    runOnnx();
  }, [clicks, hasClicked, isMultiMaskMode]);

  const handleImage = (img: HTMLImageElement = prevImage!) => {
    // Reset the image, mask and clicks
    setImage(img);
    setMaskImg(null);
    setSVG(null);
    setMask(null);
    setClick(null);
    setClicks(null);
    setIsModelLoaded({ boxModel: false, allModel: false });
    setHasClicked(false);
    const { height, width, uploadScale } = handleImageScale(img);
    setParmsandQueryModel({
      width,
      height,
      uploadScale,
      imgData: img,
      handleSegModelResults,
      imgName: "",
      shouldDownload: false,
      shouldNotFetchAllModel: false,
    });
  };

  // 使用这个函数设置一个全局的图片，当有这个图片之后，就会自动显示工作台页面
  const handleSelectedImage = async (
    data: File | string,
    embe: string,
    options?: { shouldNotFetchAllModel?: boolean; shouldDownload?: boolean }
  ) => {
    if (data instanceof File) {
      console.log("GOT FILE " + data.name);
    } else {
      console.log("GOT STRING " + data);
    }

    try {
      const shouldNotFetchAllModel = options?.shouldNotFetchAllModel;
      const shouldDownload = options?.shouldDownload;
      handleResetState();
      // setIsLoading(true);
      setShowLoadingModal(true);
      // let imgName: string = "";
      if (data instanceof URL) {
        // imgName = data.pathname;
      } else if (data instanceof String) {
        // TODO: find the right place where to replace it...
        // data = new URL(data.replace("/assets/", "/public/assets/"));
        // imgName = data.pathname;
      }

      // imgName = imgName.substring(imgName.lastIndexOf("/") + 1);
      const imgData: File = data instanceof File ? data : await getFile(data);
      const img = new Image();
      img.src = URL.createObjectURL(imgData);

      img.onload = () => {
        setIsToolBarUpload(false);
        const { height, width, scale, uploadScale } = handleImageScale(img);

        setModelScale({
          onnxScale: scale / uploadScale,
          maskWidth: width * uploadScale,
          maskHeight: height * uploadScale,
          scale: scale,
          uploadScale: uploadScale,
          width: width,
          height: height,
        });

        img.width = Math.round(width * scale);
        img.height = Math.round(height * scale);
        setImage(img);
        setPrevImage(img);
        setIsErased(false);
        setParmsandQueryModel({
          width,
          height,
          uploadScale,
          imgData: img,
          handleSegModelResults,
          imgName: embe,
          shouldDownload,
          shouldNotFetchAllModel,
        });
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleSegModelResults = ({ tensor }: { tensor: Tensor }) => {
    setTensor(tensor);
    setIsLoading(false);
    setIsErasing(false);
    setShowLoadingModal(false);
    setEraserText({ isErase: false, isEmbedding: false });
  };

  const handleResetState = () => {
    setMaskImg(null);
    setHasClicked(false);
    setClick(null);
    setClicks(null);
    setSVG(null);
    setSVGs(null);
    setAllsvg(null);
    setTensor(null);
    setImage(null);
    setPrevImage(null);
    setPredMask(null);
    setIsErased(false);
    setShowLoadingModal(false);
    setIsModelLoaded({ boxModel: false, allModel: false });
    setSegmentTypes("Click");
    setIsLoading(false);
    setIsMultiMaskMode(false);
    setIsHovering(null);
    setPredMasks(null);
  };

  const imgListContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tabsContainer = imgListContainer.current;

    const handleWheel = (event: any) => {
      event.preventDefault();
      tabsContainer!.scrollLeft += event.deltaY;
    };

    if (tabsContainer) {
      tabsContainer.addEventListener("wheel", handleWheel);
    }

    return () => {
      if (tabsContainer) {
        tabsContainer.removeEventListener("wheel", handleWheel);
      }
    };
  }, []);

  return (
    <div className={`flex flex-col h-full overflow-hidden`}>
      <Paper
        elevation={2}
        ref={imgListContainer}
        sx={{
          margin: 1,
          padding: 2,
          height: "100px",
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
        }}
      >
        {imgs.map((img, index) => {
          return (
            <img
              style={{
                height: "100%",
                marginRight: "20px",
                // filter: index === nowPos ? "brightness(0.5) contrast(1.2)" : "",
                // border:
                //   index == nowPos ? "2px solid #007bff" : "" /* 添加边框 */,
                // boxShadow:
                //   index == nowPos ? "0 0 5px #007bff" : "" /* 添加阴影效果 */,
                filter:
                  index == nowPos
                    ? "drop-shadow(0.1rem 0.1rem 1px #db9e6f) drop-shadow(-0.1rem 0.1rem 1px #db9e6f) drop-shadow(0.1rem -0.1rem 1px #db9e6f) drop-shadow(-0.1rem -0.1rem 1px #db9e6f)"
                    : "",
                cursor: "pointer",
              }}
              key={index}
              src={img.imgUrl}
              alt={img.imgUrl}
              onClick={() => {
                updateData(
                  nowPos,
                  stickers.map((sticker) => sticker.stickerData)
                );
                setPos(index);
              }}
            />
          );
        })}
      </Paper>
      <Stage
        scale={modelScale}
        info={info}
        handleResetState={handleResetState}
        handleImage={handleImage}
        hasClicked={hasClicked}
        setHasClicked={setHasClicked}
        handleNextImg={handleNextImg}
        handleLastImg={handleLastImg}
      />
    </div>
  );
}
