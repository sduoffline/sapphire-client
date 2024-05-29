import React, { useContext, useEffect, useState } from "react";
import WorkTools from "./WorkTools";
import AppContextProvider from "../../components/hooks/context";
import AppContext from "../../components/hooks/createContext";
const mockData = {
  dataSetId: 1, //数据集id
  dataSetName: "抓马", //数据集名称
  taskInfo: "区分颜色标出图中的所有马",
  objectCnt: 3, //目标种类数量
  objects: ["白马", "黑马", "棕马"], //目标种类列表
  schedule: "10/40",

  datas: [
    {
      imgUrl:
        window.location.origin + "/assets/gallery/GettyImages-1207721867.jpg",
      embeddingUrl:
        window.location.origin +
        "/assets/gallery/GettyImages-1207721867.jpg.txt",
      id: 1,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
    {
      imgUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
      embeddingUrl:
        window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
      id: 2,
    },
  ],
};
export default function WorkDesk() {
  const {
    stickers: [stickers, setStickers],
  } = useContext(AppContext)!;

  const [nowPos, setPos] = useState(0);
  const upLoadData = (pos: number, data: {}[]) => {
    /**
     * 实现抠图数据的上传
     */
  };
  const handleNextImg = () => {
    console.log(nowPos);
    if (nowPos == mockData.datas.length - 1) {
      return;
    }

    upLoadData(
      nowPos,
      stickers.map((e) => e.stickerData)
    );
    // setWorkImgUrl(mockData.datas[nowPos + 1].imgUrl);
    // setEmbImgUrl(mockData.datas[nowPos + 1].embeddingUrl);
    setPos(nowPos + 1);
  };
  const handleLastImg = () => {
    if (nowPos == 0) {
      return;
    }
    // setWorkImgUrl(mockData.datas[nowPos - 1].imgUrl);

    // setEmbImgUrl(mockData.datas[nowPos - 1].embeddingUrl);
    upLoadData(
      nowPos,
      stickers.map((e) => e.stickerData)
    );

    setPos(nowPos - 1);
  };

  return (
    <WorkTools
      imgs={mockData.datas}
      info={{
        dataSetId: mockData.dataSetId,
        dataSetName: mockData.dataSetName,
        taskInfo: mockData.taskInfo,
        objectCnt: mockData.objectCnt,
        objects: mockData.objects,
      }}
      pos={[nowPos, setPos]}
      handleNextImg={handleNextImg}
      handleLastImg={handleLastImg}
      imgUrl={mockData.datas[nowPos].imgUrl}
      embeddingUrl={mockData.datas[nowPos].embeddingUrl}
    />
  );
}
