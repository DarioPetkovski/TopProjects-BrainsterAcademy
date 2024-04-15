import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { useEffect, useState, useRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

export const Overview = () => {
  const [chartData, setChartData] = useState<any>([]);
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("month");
  const [categories, setCategories] = useState<any[]>([]);
  const [datesArray, setDatesArray] = useState<string[]>([]);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("data");
    if (data) {
      setChartData(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    setCategories(generateCategories(selectedTimeframe));
    setDatesArray(generateDatesArray()); // Update dates array when timeframe changes
  }, [selectedTimeframe]);

  const generateCategories = (timeframe: string) => {
    const currentDate = new Date();
    let startDate = new Date();
    let endDate = new Date();

    if (timeframe === "month") {
      startDate.setMonth(currentDate.getMonth() - 1);
    } else if (timeframe === "threeMonths") {
      startDate.setMonth(currentDate.getMonth() - 3);
    } else if (timeframe === "year") {
      startDate.setFullYear(currentDate.getFullYear() - 1);
    }

    return [
      { name: "Category1", startDate: startDate, endDate: endDate },
      // Add more categories as needed
    ];
  };

  const generateDatesArray = () => {
    const now = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const datesArray: Date[] = [];
    let currentDate = new Date(now);

    // Determine the number of labels based on the container width
    let numLabels = 5; // Default number of labels
    if (chartRef.current) {
      const containerWidth = chartRef.current.clientWidth;
      if (containerWidth > 768) {
        numLabels = 10; // Increase the number of labels for wider containers
      }
    }

    if (selectedTimeframe === "month") {
      // Generate dates only for the last month
      currentDate = lastMonth;
    } else if (selectedTimeframe === "threeMonths") {
      // Generate dates for the last 3 months
      currentDate.setMonth(currentDate.getMonth() - 3);
    } else if (selectedTimeframe === "year") {
      // Generate dates for the last year
      currentDate.setFullYear(currentDate.getFullYear() - 1);
    }

    while (datesArray.length < numLabels && currentDate <= now) {
      datesArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1); // Move forward by 1 day
    }

    // Format dates as "MM/DD" (short month and day)
    const formattedDatesArray = datesArray.map((date) => {
      const month = date.toLocaleString("default", { month: "short" });
      const day = date.getDate();
      return `${month} ${day}`;
    });

    return formattedDatesArray;
  };

  const filterData = (startDate: Date, endDate: Date) => {
    // Filter the data based on the selected timeframe
    const filteredData = chartData.filter((entry: { date: string }) => {
      const entryDate = new Date(entry.date);
      return entryDate >= startDate && entryDate <= endDate;
    });

    return filteredData;
  };

  const generateDataset = () => {
    const categoryData = categories.map(() => {
      // Static prices for each category
      return 8000;
    });

    return categoryData;
  };

  const handleTimeframeChange = (timeframe: string) => {
    setSelectedTimeframe(timeframe);
  };

  return (
    <div className="container-fluid px-5 chart py-5" ref={chartRef}>
      <div>
        <h1>Историја на цени</h1>
        <p>Преглед на цените на продуктот и нивно варирање</p>
      </div>
      <Bar
        className="w-100 pb-5 mt-5"
        data={{
          labels: datesArray,
          datasets: [
            {
              label: `Amount (${selectedTimeframe})`,
              borderWidth: 1,
              backgroundColor: "rgba(255, 99, 132, 0.2)",
              borderColor: "rgb(255, 99, 132)",
              data: generateDataset(),
            },
          ],
        }}
      />
      <div className="row btns-con">
        <div className="col-md d-flex flex-md-row flex-column">
          <button
            className="chart-Btn mb-md-0 mb-2 mr-md-2"
            onClick={() => handleTimeframeChange("month")}
          >
            1 Month
          </button>
          <button
            className="chart-Btn mb-md-0 mb-2 mr-md-2"
            onClick={() => handleTimeframeChange("threeMonths")}
          >
            3 Months
          </button>
          <button
            className="chart-Btn mb-md-0 mb-2"
            onClick={() => handleTimeframeChange("year")}
          >
            1 Year
          </button>
        </div>
        <div className="col-md d-flex justify-content-md-end justify-content-center">
          <button className="comment-btn">Известуванње за цена</button>
        </div>
      </div>
    </div>
  );
};
