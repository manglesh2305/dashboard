import Chart from "react-apexcharts";
import { useState, useEffect } from "react";
import axios from "axios";

function Graph() {
    const [data,setData] = useState({
        options: {
          chart: {
            id: "basic-bar"
          },
          xaxis: {
            categories: []
          },
          colors: ['#66d483']
        },
        series: [
          {
            name: "series-1",
            data: []
          }
        ]
      });

    useEffect(()=>{
        getData();
    },[])

    const getData = async() => {
        
        const res = await axios.get(`http://localhost:3001`);
        const arr = res.data;
        const timestamp = [], profit = [];
        for(let i=0;i<arr.length;i++){
            timestamp.push(arr[i].timestamp);
            profit.push(arr[i].profit);
        }
        
        setData({
            ...data,
            options:{
                ...data.options,
                xaxis:{
                    categories: timestamp
                }
            },
            series: [
                {
                  name: "series-1",
                  data: profit
                }
              ]
        })
    }

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={data.options}
              series={data.series}
              type="area"
              width="40%"
            />
          </div>
        </div>
      </div>
    );
}

export default Graph;