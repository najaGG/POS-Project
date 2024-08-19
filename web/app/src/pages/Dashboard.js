import TemplateAdmin from "../components/TemplateAdmin";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import config from "../config";
import Modal from "../components/Model";

function DashboardChart() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const start = new Date(year, month, 1);

        const end = new Date(year, month + 1, 0);

        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            const fetchData = async () => {
                try {
                    const res = await axios.get(config.api_path + '/api/dashboard-data', {
                        params: {
                            startDate,
                            endDate
                        }
                    });
                    const data = res.data;

                    const productIDs = Object.keys(data);
                    const chartData = productIDs.map(productID => ({
                        productID,
                        labels: data[productID].map(item => new Date(item.date).toLocaleDateString()),
                        datasets: [
                            {
                                label: 'StorkD',
                                data: data[productID].map(item => item.storkD),
                                fill: false,
                                backgroundColor: 'yellow',
                                borderColor: 'yellow',
                            },
                            {
                                label: 'Decrease',
                                data: data[productID].map(item => item.decrease),
                                fill: false,
                                backgroundColor: 'red',
                                borderColor: 'red',
                            },
                            {
                                label: 'Remaining (StorkD - Decrease)',
                                data: data[productID].map(item => item.remaining),
                                fill: false,
                                backgroundColor: 'green',
                                borderColor: 'green',
                            },
                        ]
                    }));

                    setChartData(chartData);
                } catch (err) {
                    console.error('Error fetching data:', err);
                    Swal.fire('Error', 'Failed to fetch dashboard data', 'error');
                }
            };

            fetchData();
        }
    }, [startDate, endDate]);

    return (
        <div>
            <h1>Dashboard Chart by Product ID</h1>
            {chartData.length > 0 && chartData.map((chart, index) => (
                <div key={index}>
                    <h2>Product ID: {chart.productID}</h2>
                    <Line data={chart} />
                </div>
            ))}
        </div>
    );
}

function Dashboard() {
    return (
        <>
            <TemplateAdmin>
                <DashboardChart />
            </TemplateAdmin>
        </>
    )
}

export default Dashboard;
