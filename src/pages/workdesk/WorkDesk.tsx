import React, { useContext, useEffect, useState } from "react";
import WorkTools from "./WorkTools";
import AppContextProvider from "../../components/hooks/context";
import AppContext from "../../components/hooks/createContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  annotate_upd_url,
  annotate_url,
  dataset_detail_url,
} from "../../constants/url";
import { queryFn } from "../../queries/queryFn";
import Loading from "../../components/loading";
import { postQueryFn } from "../../queries/postQueryFn";
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

/**
 * 工作台上层
 * 负责任务切换
 */
export default function WorkDesk() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [datasetId, setDatasetId] = useState(
    localStorage.getItem("workingDatasetId")
  );

  useEffect(() => {
    if (searchParams.get("datasetId")) {
      // console.log(searchParams.get("t"));
      setDatasetId(searchParams.get("datasetId"));
      localStorage.setItem("workingDatasetId", searchParams.get("datasetId")!);
    }
  }, [searchParams]);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (!datasetId) {
      enqueueSnackbar("请先选择数据集", { variant: "error" });
      navigate("/workshop");
    }
  }, [datasetId]);

  const {
    isError: taskIsError,
    isFetching: taskFetching,
    data: tasks,
    isSuccess: taskSuccess,
    error: taskError,
  } = useQuery({
    queryKey: [
      annotate_url +
        `/${
          searchParams.get("datasetId") ??
          localStorage.getItem("workingDatasetId")!
        }`,
      { params: { size: 10 } },
    ],
    queryFn: queryFn,
  });

  useEffect(() => {
    if (taskSuccess) {
      if (datasetId && (!tasks?.data.data || tasks?.data.data.length == 0)) {
        // localStorage.removeItem("workingDatasetId");
        // console.log(tasks);
        enqueueSnackbar("当前数据集没有任务", { variant: "warning" });
        navigate("/workshop");
      }
      if (datasetId && tasks?.data?.data[0]?.embeddingUrl == "") {
        // localStorage.removeItem("workingDatasetId");
        // console.log(tasks);
        enqueueSnackbar("embedding尚未计算完成，请耐心等待", {
          variant: "warning",
        });
        navigate("/workshop");
      }
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
      dataset_detail_url +
        "/" +
        (searchParams.get("datasetId") ??
          localStorage.getItem("workingDatasetId")),
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

  const {
    mutate: updMutate,
    isPending: updPending,
    isSuccess: updSuccess,
  } = useMutation({
    mutationFn: postQueryFn,
  });

  const upLoadData = (pos: number, data: {}[]) => {
    /**
     * 实现抠图数据的上传
     */
    // console.log("上传数据", {
    //   id: tasks?.data.data[pos].ID,
    //   datasetId: info?.data.data.dataSetId,
    //   data: data,
    // });
    if (data.length == 0) return;
    updMutate({
      data: {
        imgId: tasks?.data.data[pos].ID,
        datasetId: info?.data.data.dataSetId,
        marks: data,
      },
      url: annotate_upd_url,
      method: "post",
    });
  };

  const handleNextImg = () => {
    upLoadData(
      nowPos,
      stickers.map((e) => e.stickerData)
    );
    if (nowPos == tasks?.data.data.length - 1) {
      enqueueSnackbar("已经是最后一张图片", { variant: "warning" });
      return;
    }
    setPos(nowPos + 1);
  };
  const handleLastImg = () => {
    upLoadData(
      nowPos,
      stickers.map((e) => e.stickerData)
    );

    if (nowPos == 0) {
      enqueueSnackbar("已经是第一张图片", { variant: "warning" });
      return;
    }

    setPos(nowPos - 1);
  };

  return (
    <>
      {taskFetching && <Loading />}
      {taskSuccess &&
        infoIsSuccess &&
        tasks.data.data &&
        tasks.data.data.length > 0 && (
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
            imgUrl={tasks.data.data[nowPos].imgUrl.replace(
              /.*\//,
              "/dataimgs/"
            )}
            embeddingUrl={tasks.data.data[nowPos].embeddingUrl}
            updateData={upLoadData}
          />
        )}
    </>
  );
}
