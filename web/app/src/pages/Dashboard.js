import Template from "../components/TemplateAdmin";
import axios from "axios";
import config from "../config";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const [datas, setDatas] = useState([]);
    const [productNames, setProductNames] = useState({});

    useEffect(() => {
        fetchdata();
    }, []);

    const fetchdata = async () => {
        try {
            const res = await axios.get(config.api_path + '/datas/dashboard', config.headers());
            if (res.data.message === 'success') {
                setDatas(res.data.result);

                const names = res.data.result.reduce((acc, item) => {
                    acc[item.productID] = item.nameProduct;
                    return acc;
                }, {});
                setProductNames(names);
            }
        } catch (error) {
            Swal.fire('Error', 'Failed to fetch data', 'error');
        }
    };
    
    
    const getDaysInMonth = (month) => {
        const daysInMonth = moment(month, 'YYYY-MM').daysInMonth();
        return Array.from({ length: daysInMonth }, (_, i) => i + 1);
    };

    const formatChartData = (data, productID) => {
        const currentMonthYear = moment().format('YYYY-MM');
    
        // Filter data for the current month and year
        const filteredData = data.filter(item => 
            item.productID === productID && 
            moment(item.createdAt).format('YYYY-MM') === currentMonthYear
        );
    
        const groupedData = {};
        let previousAll = 0;  
    
        filteredData.forEach(item => {
            const day = parseInt(moment(item.createdAt).format('D'), 10);
    
            if (!groupedData[day]) {
                groupedData[day] = { stockD: 0, decrease: 0, all: 0 };
            }
    
            groupedData[day].stockD += parseInt(item.stockD || 0);
    
            groupedData[day].decrease += parseInt(item.decrease || 0);
        });
    
        const labels = getDaysInMonth(currentMonthYear);
        labels.forEach(day => {
            const currentData = groupedData[day] || { stockD: 0, decrease: 0, all: 0 };
            currentData.all = previousAll + currentData.stockD - currentData.decrease;

            previousAll = currentData.all;

            groupedData[day] = currentData;
        });
    
        const chartData = {
            labels,
            datasets: [
                {
                    label: 'สินค้าที่เพิ่มเข้า',
                    data: labels.map(day => groupedData[day]?.stockD || 0),
                    borderColor: 'rgba(79, 186, 42, 1)',
                    borderWidth: 3,
                    fill: true,
                },
                {
                    label: 'สินค้าที่จำหน่ายออก',
                    data: labels.map(day => groupedData[day]?.decrease || 0),
                    borderColor: 'rgba(236, 87, 87, 1)',
                    borderWidth: 3,
                    fill: true,
                },
                {
                    label: 'สินค้าคงเหลือ',
                    data: labels.map(day => groupedData[day]?.all || 0),
                    borderColor: 'rgba(231, 212, 43, 1)',
                    borderWidth: 3,
                    fill: true,
                }
            ],
        };
        return chartData;
    };
    
    const uniqueProductIDs = [...new Set(datas.map(item => item.productID))];
    return (
        <Template>
            <div>
                <h1>Dashboard</h1>
                {uniqueProductIDs.map(productID => (
                    <div key={productID}>
                        <h2>Product Name: {productNames[productID]}</h2>
                        {datas.length > 0 ? (
                            <Line data={formatChartData(datas, productID)} />
                        ) : (
                            <p>Loading data...</p>
                        )}
                    </div>
                ))}
            </div>
        </Template>
    );
}

export default Dashboard;
