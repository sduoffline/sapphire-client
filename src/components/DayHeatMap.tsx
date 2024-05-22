import HeatMap from '@uiw/react-heat-map';

const value = [
  { date: '2016/01/11', count: 2 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2016/01/${idx + 10}`,
    count: idx,
  })),
  ...[...Array(17)].map((_, idx) => ({
    date: `2016/02/${idx + 10}`,
    count: idx,
  })),
  { date: '2016/04/12', count: 2 },
  { date: '2016/05/01', count: 5 },
  { date: '2016/05/02', count: 5 },
  { date: '2016/05/03', count: 1 },
  { date: '2016/05/04', count: 11 },
  { date: '2016/05/08', count: 32 },
];

export default function DayHeatmap() {
  return (
    <HeatMap
      value={value}
      width={800}
      rectSize={14}
      weekLabels={['一', '二', '三', '四', '五', '六', '日']}
      monthLabels={[
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ]}
      startDate={new Date('2016/01/01')}
      panelColors={{
        0: '#f4decd',
        2: '#e4b293',
        4: '#d48462',
        10: '#c2533a',
        20: '#ad001d',
        30: '#000',
      }}
    />
  );
}
