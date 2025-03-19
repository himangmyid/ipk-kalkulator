// File: components/Charts.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts/core';
import { GaugeChart, LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  GaugeChart,
  LineChart,
  CanvasRenderer
]);

type SemesterSummary = {
  id: number;
  totalCredits: number;
  totalPoints: number;
  gpa: number;
};

type ChartsProps = {
  semesterData: SemesterSummary[];
  cumulativeGPA: number;
  darkMode: boolean; // Tambahkan prop darkMode
};

export const Charts: React.FC<ChartsProps> = ({ semesterData, cumulativeGPA, darkMode }) => {
  const gaugeChartRef = useRef<HTMLDivElement>(null);
  const lineChartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gaugeChartRef.current || !lineChartRef.current) return;

    // Tentukan tema berdasarkan darkMode
    const theme = darkMode ? 'dark' : 'light';

    // Inisialisasi chart dengan tema yang sesuai
    const gaugeChart = echarts.init(gaugeChartRef.current, theme);
    const lineChart = echarts.init(lineChartRef.current, theme);

    // Opsi untuk gauge chart
    const gaugeOption = {
      backgroundColor: darkMode ? '#2a2a2a' : '#FFFFFF', // Sesuaikan background
      series: [
        {
          type: 'gauge',
          startAngle: 180,
          endAngle: 0,
          min: 0,
          max: 4,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.25, '#FF6E76'], // 0-1: Merah (E-D)
                [0.5, '#FDDD60'],  // 1-2: Kuning (D-C)
                [0.75, '#58D9F9'], // 2-3: Biru Muda (C-B)
                [1, '#7CFFB2']     // 3-4: Hijau (B-A)
              ]
            }
          },
          pointer: {
            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
            length: '12%',
            width: 20,
            offsetCenter: [0, '-60%'],
            itemStyle: {
              color: 'auto'
            }
          },
          axisTick: {
            length: 12,
            lineStyle: {
              color: darkMode ? '#FFFFFF' : '#464646', // Sesuaikan warna teks
              width: 2
            }
          },
          splitLine: {
            length: 20,
            lineStyle: {
              color: darkMode ? '#FFFFFF' : '#464646', // Sesuaikan warna teks
              width: 5
            }
          },
          axisLabel: {
            color: darkMode ? '#FFFFFF' : '#464646', // Sesuaikan warna teks
            fontSize: 14,
            distance: -60,
            formatter: function (value: number) {
              return value.toFixed(1);
            }
          },
          title: {
            offsetCenter: [0, '20%'], // Pindahkan teks "IPK Kumulatif" ke bawah
            fontSize: 20,
            color: darkMode ? '#FFFFFF' : '#2a2a2a' // Sesuaikan warna teks
          },
          detail: {
            fontSize: 30,
            offsetCenter: [0, '0%'], // Biarkan nilai IPK di tengah
            valueAnimation: true,
            formatter: function (value: number) {
              return value.toFixed(2);
            },
            color: darkMode ? '#FFFFFF' : '#2a2a2a' // Sesuaikan warna teks
          },
          data: [
            {
              value: cumulativeGPA,
              name: 'IPK Kumulatif'
            }
          ]
        }
      ]
    };

    gaugeChart.setOption(gaugeOption);

    // Opsi untuk line chart
    const lineOption = {
      backgroundColor: darkMode ? '#2a2a2a' : '#FFFFFF', // Sesuaikan background
      title: {
        text: 'Perkembangan IPK per Semester',
        left: 'center',
        textStyle: {
          color: darkMode ? '#FFFFFF' : '#2a2a2a' // Sesuaikan warna teks
        }
      },
      tooltip: {
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        data: semesterData.map(data => `Semester ${data.id}`),
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: darkMode ? '#FFFFFF' : '#464646' // Sesuaikan warna teks
          }
        },
        axisLabel: {
          color: darkMode ? '#FFFFFF' : '#464646' // Sesuaikan warna teks
        }
      },
      yAxis: {
        type: 'value',
        name: 'IPK',
        min: 0,
        max: 4,
        interval: 0.5,
        axisLine: {
          lineStyle: {
            color: darkMode ? '#FFFFFF' : '#464646' // Sesuaikan warna teks
          }
        },
        axisLabel: {
          color: darkMode ? '#FFFFFF' : '#464646' // Sesuaikan warna teks
        }
      },
      series: [
        {
          name: 'IPK Semester',
          type: 'line',
          data: semesterData.map(data => data.gpa),
          smooth: true,
          lineStyle: {
            width: 4
          },
          itemStyle: {
            color: '#36C5F0'
          },
          emphasis: {
            focus: 'series'
          }
        }
      ]
    };

    lineChart.setOption(lineOption);

    // Resize handling
    const handleResize = () => {
      gaugeChart.resize();
      lineChart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      gaugeChart.dispose();
      lineChart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [semesterData, cumulativeGPA, darkMode]); // Tambahkan darkMode ke dependency array

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="neo-box p-4 h-[300px]">
        <div ref={gaugeChartRef} className="w-full h-full"></div>
      </div>
      <div className="neo-box p-4 h-[300px]">
        <div ref={lineChartRef} className="w-full h-full"></div>
      </div>
    </div>
  );
};