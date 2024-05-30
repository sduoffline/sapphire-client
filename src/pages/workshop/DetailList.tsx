import { useEffect } from "react";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  IconButton,
  Container,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "@mui/icons-material";

import useDatasets from "../../queries/useDatasets";
import { Dataset } from "../../types";
import DataSet from "../../components/DataSet";
import MyDataSet from "../../components/MyDataSet";
import { useMutation, useQuery } from "@tanstack/react-query";
import { postQueryFn } from "../../queries/postQueryFn";
import Loading from "../../components/loading";
import { all_datasets_url } from "../../constants/url";
import { queryFn } from "../../queries/queryFn";

interface DatasetItemProps {
  item: Dataset;
}

function DatasetItem({ item }: DatasetItemProps) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/dataset/detail/${id}`);
  };

  return (
    <ImageListItem
      onClick={() => handleClick(item.id)}
      key={item.img}
      sx={{
        boxShadow: "0 0 5px 0 rgba(0, 0, 0, 0.2)",
        // hover效果
        "&:hover": {
          cursor: "pointer",
          boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
          transform: "scale(1.05)",
          transition: "all 0.3s",
          shadow: "none",
        },
      }}
    >
      <img
        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${item.img}`}
        alt={item.name}
        loading="lazy"
      />
      <ImageListItemBar
        title={item.name}
        subtitle={item.description}
        actionIcon={
          <IconButton
            sx={{ color: "rgba(255, 255, 255, 0.54)" }}
            aria-label={`info about ${item.name}`}
          >
            <ChevronRight />
          </IconButton>
        }
      />
    </ImageListItem>
  );
}

const mockData = [
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
  {
    dataSetId: 1, //数据集id
    dataSetName: "抓马", //数据集名称
    taskInfo: "区分颜色标出图中的所有马",
    objectCnt: 3, //目标种类数量
    objects: ["白马", "黑马", "棕马"], //目标种类列表
    schedule: "2024-05-31",
    total: 100,
    finished: 20,
  },
];

export default function TitlebarImageList() {
  const { data, isLoading, isError, error, isSuccess } = useQuery({
    queryKey: [
      all_datasets_url,
      { params: { user_id: localStorage.getItem("userId") } },
    ],
    queryFn: queryFn,
  });
  useEffect(() => {
    if (isSuccess) {
      console.log(data.data.data);
    }
  }, [isSuccess]);
  return (
    <div
      style={{
        display: "flex",
        flex: "row",
        flexWrap: "wrap",
      }}
    >
      {isSuccess &&
        data?.data?.data?.map((item: any) => {
          return <MyDataSet dataset={item} />;
        })}
      {isLoading && <Loading />}
    </div>
  );
}
