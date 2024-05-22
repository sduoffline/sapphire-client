import React, { useEffect, useState } from 'react'
import WorkTools from './WorkTools'
import AppContextProvider from '../../components/hooks/context'
const mockData = {
  dataSetId:1,//数据集id
  dataSetName:1,//数据集名称
  taskInfo:"区分颜色标出图中的所有马",
  objectCnt:3,//目标种类数量
  objects:["白马","黑马","棕马"],//目标种类列表
  datas: [{
    imgUrl:window.location.origin + "/assets/gallery/GettyImages-1207721867.jpg",
    embeddingUrl:window.location.origin + "/assets/gallery/GettyImages-1207721867.jpg.txt",
    id:1,
  },
  {
    imgUrl:window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg",
    embeddingUrl:window.location.origin + "/assets/gallery/AdobeStock_323574125.jpg.txt",
    id:2,
  }
]}
export default function WorkDesk() {
  const [nowPos,setPos] = useState(0);
  const handleNextImg = () => {
    console.log(nowPos);
    if(nowPos == mockData.datas.length - 1){
      return;
    }
    // setWorkImgUrl(mockData.datas[nowPos + 1].imgUrl);
    // setEmbImgUrl(mockData.datas[nowPos + 1].embeddingUrl);
    setPos(nowPos + 1);
  } 
  const handleLastImg = () => {
    if(nowPos == 0){
      return;
    }
    // setWorkImgUrl(mockData.datas[nowPos - 1].imgUrl);
    // setEmbImgUrl(mockData.datas[nowPos - 1].embeddingUrl);
    
    setPos(nowPos - 1);
  }


  return (
      <WorkTools handleNextImg = {handleNextImg} handleLastImg = {handleLastImg} imgUrl={mockData.datas[nowPos].imgUrl} embeddingUrl={mockData.datas[nowPos].embeddingUrl} />
  )
}
