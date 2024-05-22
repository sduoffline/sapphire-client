import { InferenceSession, Tensor } from "onnxruntime-web";

export interface AnnotationProps {
  x: number;
  y: number;
  width: number;
  height: number;
  clickType: number;
}

export interface modelInputProps {
  x: number;
  y: number;
  width: null | number;
  height: null | number;
  clickType: number;
}

export enum clickType {
  POSITIVE = 1.0,
  NEGATIVE = 0.0,
  UPPER_LEFT = 2.0,
  BOTTOM_RIGHT = 3.0,
}

export interface modelScaleProps {
  onnxScale: number;
  maskWidth: number;
  maskHeight: number;
  scale: number;
  uploadScale: number;
  width: number;
  height: number;
}

export interface setParmsandQueryModelProps {
  width: number;
  height: number;
  uploadScale: number;
  imgData: HTMLImageElement;
  handleSegModelResults: ({ tensor }: { tensor: Tensor }) => void;

  imgName: string | null;
  shouldDownload: boolean | undefined;
  shouldNotFetchAllModel: boolean | undefined;
}

export interface setParmsandQueryEraseModelProps {
  width: number;
  height: number;
  uploadScale: number;
  imgData: HTMLImageElement | null;
  mask:
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
  | BigUint64Array;
  handlePredictedImage: (e: string) => void;
}

export interface queryEraseModelProps {
  image: Blob | string;
  mask:
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
  | BigUint64Array;
  handlePredictedImage: (e: string) => void;
}

export interface queryModelReturnTensorsProps {
  blob: Blob;
  handleSegModelResults: ({ tensor }: { tensor: Tensor }) => void;

  image_height: number;
  imgName: string | null;
  shouldDownload: boolean | undefined;
  shouldNotFetchAllModel: boolean | undefined;
}

export interface modeDataProps {
  clicks?: Array<modelInputProps>;
  tensor: Tensor;
  modelScale: modelScaleProps;
  best_box?: number[];
  point_coords?: Array<number[]>;
  point_labels?: number[];
  last_pred_mask: Tensor | null;
}

export interface StageProps {
  handleResetState: () => void;
  handleImage: (img?: HTMLImageElement) => void;
  scale: modelScaleProps | null;
  hasClicked: boolean;
  setHasClicked: (e: boolean) => void;
  handleNextImg: () => void;
  handleLastImg: () => void;

}
