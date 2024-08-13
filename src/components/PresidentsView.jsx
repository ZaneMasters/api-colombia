import React, { useEffect, useState } from 'react';
import { getPresidents } from '../services/apiService';
import RecordCount from './RecordCount';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../styles/presidentViewStyle.css'; 

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PresidentsView = () => {
    const [presidents, setPresidents] = useState([]);
    const [responseTime, setResponseTime] = useState(0);
    const [isAscending, setIsAscending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const startTime = Date.now();
            const data = await getPresidents();
            setPresidents(data);
            setResponseTime(Date.now() - startTime);
        };
        fetchData();
    }, []);

    const groupByParty = (presidents) => {
        const grouped = presidents.reduce((acc, president) => {
            const party = president.politicalParty;
            if (!acc[party]) acc[party] = [];
            acc[party].push(president);
            return acc;
        }, {});
        return Object.entries(grouped).sort((a, b) => {
            if (isAscending) {
                return a[1].length - b[1].length; // Ascendente
            } else {
                return b[1].length - a[1].length; // Descendente
            }
        });
    };

    const groupedPresidents = groupByParty(presidents);

    const handleCheckboxChange = () => {
        setIsAscending(!isAscending);
    };

    const chartData = {
        labels: groupedPresidents.map(([party]) => party),
        datasets: [
            {
                label: '# de Presidentes',
                data: groupedPresidents.map(([_, presidents]) => presidents.length),
                backgroundColor: [
                    'rgba(52, 152, 219, 0.8)',
                    'rgba(46, 204, 113, 0.8)',
                    'rgba(231, 76, 60, 0.8)',
                    'rgba(155, 89, 182, 0.8)',
                    'rgba(241, 196, 15, 0.8)',
                    'rgba(230, 126, 34, 0.8)',
                ],
                borderColor: [
                    'rgba(52, 152, 219, 1)',
                    'rgba(46, 204, 113, 1)',
                    'rgba(231, 76, 60, 1)',
                    'rgba(155, 89, 182, 1)',
                    'rgba(241, 196, 15, 1)',
                    'rgba(230, 126, 34, 1)',
                ],
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="container">
            <div className="chart-container">
                <Bar className="chart" data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
            <div className="checkbox-container">
                <RecordCount count={presidents.length} entity="Presidents" />
                <p>API Response Time: {responseTime}ms</p>
                <label>
                    <input
                        type="checkbox"
                        checked={isAscending}
                        onChange={handleCheckboxChange}
                    />
                    Mostrar en orden ascendente
                </label>
            </div>
            <div className="cards-container">
                {groupedPresidents.map(([party, presidents]) => (
                    <div key={party} className="card">
                        <h2>{party}</h2>
                        <ul>
                            {presidents.map((president) => (
                                <li key={president.id}>{president.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PresidentsView;
