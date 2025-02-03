import React from "react";
import Chart from "react-apexcharts";
import { useTheme } from "../theme-provider";

function CandleStickGraph({ data }) {
  const { theme } = useTheme();

  function convertToChartFormat() {
    return data?.map((item) => ({
      x: new Date(item.t).toString().slice(0, 11),
      y: [item.o, item.h, item.l, item.c],
    }));
  }

  return (
    <>
      <Chart
        options={{
          chart: {
            //   width: "100%",
            id: "1",
            background: "transparent",
          },
          fill: {
            colors: ["white"],
          },
          theme: {
            mode: theme,
          },
        }}
        series={[
          {
            data: convertToChartFormat(),
          },
        ]}
        type="candlestick"
        width="100%"
        height={500}
      />
    </>
    // <div className="w-full">

    // </div>
  );
}

export default CandleStickGraph;
