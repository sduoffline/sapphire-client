import React from "react";
const littleMonth = [4, 6, 9, 11];
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
};

export const getHeatmap = (type, id) => {
  if (type == "user" && id >= 23) return [];
  if (type !== "user" && id >= 35) return [];
  if (type == "user") id += 10000;

  let data = [];
  for (let i = 1; i <= 6; ++i) {
    let tmp = 31;
    if (i == 6) tmp = 24;
    else if (i == 2) tmp = 29;
    else if (littleMonth.includes(i)) tmp = 30;

    for (let j = 1; j <= tmp; ++j) {
      let hash1 = hashCode(`${id}and${i}and${j}`);
      if (hash1 % 7 <= 1) {
        data.push({
          date: `2024/${i}/${j}`,
          count: hashCode(`${id}or${i}or${j}`) % 21,
        });
      }
    }
  }
  // console.log("inner", id);
  return data;
};
