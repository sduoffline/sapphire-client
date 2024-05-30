import React, { useContext, useEffect, useState } from "react";
import WorkTools from "./WorkTools";
import AppContextProvider from "../../components/hooks/context";
import AppContext from "../../components/hooks/createContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import { annotate_url, dataset_detail_url } from "../../constants/url";
import { queryFn } from "../../queries/queryFn";
import Loading from "../../components/loading";
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
  const [datasetId, setDatasetId] = useState(
    localStorage.getItem("workingDatasetId")
  );
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (!datasetId) {
      enqueueSnackbar("请先选择数据集", { variant: "error" });
      navigate("/datasets");
    }
  }, [datasetId]);

  const {
    isError: taskIsError,
    isFetching: taskFetching,
    data: tasks,
    isSuccess: taskSuccess,
    error: taskError,
  } = useQuery({
    queryKey: [annotate_url + `/${datasetId}`, { params: { size: 10 } }],
    queryFn: queryFn,
  });

  useEffect(() => {
    if (!tasks?.data.data || tasks?.data.data.length == 0) {
      localStorage.removeItem("workingDatasetId");
      enqueueSnackbar("当前数据集没有任务", { variant: "error" });
      navigate("/datasets");
    }
  }, [taskSuccess]);
  const {
    isSuccess: infoIsSuccess,
    data: info,
    isFetching: infoFetching,
    isError: infoIsError,
    error: infoError,
  } = useQuery({
    queryKey: [
      dataset_detail_url + "/" + datasetId,
      { params: { user_id: localStorage.getItem("userId") } },
    ],
    queryFn: queryFn,
  });

  useEffect(() => {
    if (infoIsSuccess) {
      console.log(info.data.data);
    }
  }, [infoIsSuccess]);

  const {
    stickers: [stickers, setStickers],
  } = useContext(AppContext)!;

  const [nowPos, setPos] = useState(0);
  const upLoadData = (pos: number, data: {}[]) => {
    /**
     * 实现抠图数据的上传
     */
    console.log("上传数据", {
      id: mockData.datas[pos].id,
      data: data,
    });
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
    setPos(nowPos + 1);
  };
  const handleLastImg = () => {
    if (nowPos == 0) {
      return;
    }
    upLoadData(
      nowPos,
      stickers.map((e) => e.stickerData)
    );

    setPos(nowPos - 1);
  };

  return (
    <>
      {taskFetching && <Loading />}
      {taskSuccess && infoIsSuccess && (
        <WorkTools
          imgs={tasks.data.data}
          info={{
            dataSetId: info.data.data.dataSetId,
            dataSetName: info.data.data.dataSetName,
            taskInfo: info.data.data.taskInfo,
            objectCnt: info.data.data.objectCnt,
            objects: info.data.data.objects,
          }}
          pos={[nowPos, setPos]}
          handleNextImg={handleNextImg}
          handleLastImg={handleLastImg}
          imgUrl={tasks.data.data[nowPos].imgUrl}
          embeddingUrl={tasks.data.data[nowPos].embeddingUrl}
          updateData={upLoadData}
        />
      )}
    </>
  );
}
