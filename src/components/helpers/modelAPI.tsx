import { Tensor } from "onnxruntime-web";

import {
  clickType,
  modeDataProps,
  modelInputProps,
  queryEraseModelProps,
  queryModelReturnTensorsProps,
  setParmsandQueryEraseModelProps,
  setParmsandQueryModelProps,
} from "./Interface";

const API_ENDPOINT =
  "https://model-zoo.metademolab.com/predictions/segment_everything_box_model";
const ALL_MASK_API_ENDPOINT =
  "https://model-zoo.metademolab.com/predictions/automatic_masks";
//const API_ENDPOINT = process.env.API_ENDPOINT;
//const ALL_MASK_API_ENDPOINT = process.env.ALL_MASK_API_ENDPOINT;
const ERASE_API_ENDPOINT = process.env.ERASE_API_ENDPOINT;

const setParmsandQueryModel = ({
  width,
  height,
  uploadScale,
  imgData,
  handleSegModelResults,
  imgName,
  shouldDownload,
  shouldNotFetchAllModel,
}: setParmsandQueryModelProps) => {
  // console.log("setParmsandQueryModel");
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * uploadScale);
  canvas.height = Math.round(height * uploadScale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(imgData, 0, 0, canvas.width, canvas.height);
  // console.log("plot uploaded image");
  canvas.toBlob(
    (blob) => {
      blob &&
        queryModelReturnTensors({
          blob,
          handleSegModelResults,
          image_height: canvas.height,
          imgName,
          shouldDownload,
          shouldNotFetchAllModel,
        });
    },
    "image/jpeg",
    1.0
  );
};

const queryModelReturnTensors = async ({
  blob,
  handleSegModelResults,
  image_height, // Original image height
  imgName,
  shouldDownload,
  shouldNotFetchAllModel,
}: queryModelReturnTensorsProps) => {
  // console.log("image_height, imgName, shouldDownload, shouldNotFetchAllModel:", image_height, imgName, shouldDownload, shouldNotFetchAllModel)
  // console.log("pre-queryModelReturnTensors");
  if (!API_ENDPOINT) return;
  if (!ALL_MASK_API_ENDPOINT) return;
  // console.log("post-queryModelReturnTensors");
  // console.log("imgName, shouldDownload, shouldNotFetchAllModel:", imgName, shouldDownload, shouldNotFetchAllModel)
  // console.log("imgName", `/assets/gallery/${imgName}.txt`);
  // const segRequest =
  //   imgName && !shouldDownload
  //     ? fetch(`/assets/gallery/${imgName}.txt`)
  //     : fetch(`${imgName}`, {
  //       method: "POST",
  //       body: blob,
  //     });
  const segRequest = fetch(`${imgName}`);

  segRequest.then(async (segResponse) => {
    const segJSON = await segResponse.json();
    const embedArr = segJSON.map((arrStr: string) => {
      const binaryString = window.atob(arrStr);
      const uint8arr = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        uint8arr[i] = binaryString.charCodeAt(i);
      }
      const float32Arr = new Float32Array(uint8arr.buffer);
      return float32Arr;
    });
    const lowResTensor = new Tensor("float32", embedArr[0], [1, 256, 64, 64]);
    handleSegModelResults({
      tensor: lowResTensor,
    });
  });
};

const queryEraseModel = async ({
  image,
  mask,
  handlePredictedImage,
}: queryEraseModelProps) => {
  const [eraseResponse] = await Promise.all([
    fetch(`${ERASE_API_ENDPOINT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: image,
        // @ts-ignore
        mask: Array.from(mask),
        dilate_kernel_size: 24,
      }),
    }),
  ]);
  const [eraseJSON] = await Promise.all([eraseResponse.text()]);
  const imgSrc = "data:image/png;base64, " + eraseJSON;
  handlePredictedImage(imgSrc);
};

const getBase64StringFromDataURL = (dataURL: string) =>
  dataURL.replace("data:", "").replace(/^.+,/, "");

const setParmsandQueryEraseModel = ({
  width,
  height,
  uploadScale,
  imgData,
  mask,
  handlePredictedImage,
}: setParmsandQueryEraseModelProps) => {
  // console.log("Querying erase model");
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(width * uploadScale);
  canvas.height = Math.round(height * uploadScale);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.drawImage(imgData || new Image(), 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL();
  const b64im = getBase64StringFromDataURL(dataURL);
  queryEraseModel({
    image: b64im,
    mask,
    handlePredictedImage,
  });
};

const getPointsFromBox = (box: modelInputProps) => {
  if (box.width === null || box.height === null) return;
  const upperLeft = { x: box.x, y: box.y };
  const bottomRight = { x: box.width, y: box.height };
  return { upperLeft, bottomRight };
};

const isFirstClick = (clicks: Array<modelInputProps>) => {
  return (
    (clicks.length === 1 &&
      (clicks[0].clickType === clickType.POSITIVE ||
        clicks[0].clickType === clickType.NEGATIVE)) ||
    (clicks.length === 2 &&
      clicks.every(
        (c) =>
          c.clickType === clickType.UPPER_LEFT ||
          c.clickType === clickType.BOTTOM_RIGHT
      ))
  );
};

const modelData = ({
  clicks, //选择方式
  tensor, //
  modelScale, //选择区域
  point_coords,
  point_labels,
  last_pred_mask,
}: modeDataProps) => {
  const lowResTensor = tensor;
  let pointCoords;
  let pointLabels;
  let pointCoordsTensor;
  let pointLabelsTensor;

  // point click model check
  if (clicks) {
    let n = clicks.length;
    const clicksFromBox = clicks[0].clickType === 2 ? 2 : 0;

    // For click only input (no box) need to add an extra
    // negative point and label
    pointCoords = new Float32Array(2 * (n + 1));
    pointLabels = new Float32Array(n + 1);

    // Check if there is a box input
    if (clicksFromBox) {
      // For box model need to include the box clicks in the point

      pointCoords = new Float32Array(2 * (n + clicksFromBox));
      pointLabels = new Float32Array(n + clicksFromBox);
      const {
        upperLeft,
        bottomRight,
      }: {
        upperLeft: { x: number; y: number };
        bottomRight: { x: number; y: number };
      } = getPointsFromBox(clicks[0])!;
      pointCoords = new Float32Array(2 * (n + clicksFromBox));
      pointLabels = new Float32Array(n + clicksFromBox);
      pointCoords[0] = upperLeft.x / modelScale.onnxScale;
      pointCoords[1] = upperLeft.y / modelScale.onnxScale;
      pointLabels[0] = 2.0; // UPPER_LEFT
      pointCoords[2] = bottomRight.x / modelScale.onnxScale;
      pointCoords[3] = bottomRight.y / modelScale.onnxScale;
      pointLabels[1] = 3.0; // BOTTOM_RIGHT

      last_pred_mask = null;
    }

    for (let i = 0; i < n; i++) {
      pointCoords[2 * (i + clicksFromBox)] = clicks[i].x / modelScale.onnxScale;
      pointCoords[2 * (i + clicksFromBox) + 1] =
        clicks[i].y / modelScale.onnxScale;
      pointLabels[i + clicksFromBox] = clicks[i].clickType;
    }

    if (!clicksFromBox) {
      pointCoords[2 * n] = 0.0;
      pointCoords[2 * n + 1] = 0.0;
      pointLabels[n] = -1.0;
      // update n for creating the tensor
      n = n + 1;
    }

    // Create the tensor
    pointCoordsTensor = new Tensor("float32", pointCoords, [
      1,
      n + clicksFromBox,
      2,
    ]);
    pointLabelsTensor = new Tensor("float32", pointLabels, [
      1,
      n + clicksFromBox,
    ]);
  }
  const imageSizeTensor = new Tensor("float32", [
    modelScale.maskHeight,
    modelScale.maskWidth,
  ]);
  if (pointCoordsTensor === undefined || pointLabelsTensor === undefined)
    return;

  const lastPredMaskTensor =
    last_pred_mask && clicks && !isFirstClick(clicks)
      ? last_pred_mask
      : new Tensor("float32", new Float32Array(256 * 256), [1, 1, 256, 256]);

  const hasLastPredTensor = new Tensor("float32", [
    +!!(last_pred_mask && clicks && !isFirstClick(clicks)),
  ]);

  return {
    low_res_embedding: lowResTensor,
    point_coords: pointCoordsTensor,
    point_labels: pointLabelsTensor,
    image_size: imageSizeTensor,
    last_pred_mask: lastPredMaskTensor,
    has_last_pred: hasLastPredTensor,
  };
};

export { setParmsandQueryModel, modelData, setParmsandQueryEraseModel };
