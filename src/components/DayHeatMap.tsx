import HeatMap from "@uiw/react-heat-map";
import { useEffect, useState } from "react";
import { getHeatmap } from "../api/getHeat";

// const value = [
//   { date: "2024/01/11", count: 2 },
//   ...[...Array(17)].map((_, idx) => ({
//     date: `2024/01/${idx + 10}`,
//     count: idx,
//   })),
//   ...[...Array(17)].map((_, idx) => ({
//     date: `2024/02/${idx + 10}`,
//     count: idx,
//   })),
//   { date: "2024/04/12", count: 2 },
//   { date: "2024/05/01", count: 5 },
//   { date: "2024/05/02", count: 5 },
//   { date: "2024/05/03", count: 1 },
//   { date: "2024/05/04", count: 11 },
//   { date: "2024/05/08", count: 32 },
// ];

export default function DayHeatmap(props: any) {
  const { type, id } = props;
  const [value, setValue] = useState<any>();
  useEffect(() => {
    // console.log(id);
    let tmp = getHeatmap(type, id);
    console.log(tmp);
    setValue(tmp);
    console.log(value);
  }, []);
  return (
    <HeatMap
      value={value}
      width={800}
      rectSize={14}
      weekLabels={["一", "二", "三", "四", "五", "六", "日"]}
      monthLabels={[
        "一月",
        "二月",
        "三月",
        "四月",
        "五月",
        "六月",
        "七月",
        "八月",
        "九月",
        "十月",
        "十一月",
        "十二月",
      ]}
      startDate={new Date("2024/01/01")}
      panelColors={{
        0: "#f4decd",
        2: "#e4b293",
        4: "#d48462",
        10: "#c2533a",
        20: "#ad001d",
        30: "#000",
      }}
    />
  );
}
