import React, { useEffect, useState } from 'react';
import { getAirports } from '../services/apiService';
import RecordCount from './RecordCount';
import '../styles/AirportsView.css';

const AirportsView = () => {
    const [airports, setAirports] = useState([]);
    const [responseTime, setResponseTime] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const startTime = Date.now();
            const data = await getAirports();
            setAirports(data);
            setResponseTime(Date.now() - startTime);
        };
        fetchData();
    }, []);

    const groupAirportsByCity = (airports) => {
        const grouped = airports.reduce((acc, airport) => {
            const departmentName = airport.department.name;
            const cityName = airport.city.name;

            if (!acc[departmentName]) acc[departmentName] = {};
            if (!acc[departmentName][cityName]) acc[departmentName][cityName] = [];
            acc[departmentName][cityName].push(airport.name);

            return acc;
        }, {});

        return grouped;
    };

    const groupAirportsByRegion = (airports) => {
        const grouped = airports.reduce((acc, airport) => {
            const { department, city, type } = airport;
            const regionName = department?.region?.name || "Unknown Region";
            const departmentName = department.name;
            const cityName = city.name;
            const airportType = type;

            if (!acc[regionName]) acc[regionName] = {};
            if (!acc[regionName][departmentName]) acc[regionName][departmentName] = {};
            if (!acc[regionName][departmentName][cityName]) acc[regionName][departmentName][cityName] = {};
            if (!acc[regionName][departmentName][cityName][airportType]) {
                acc[regionName][departmentName][cityName][airportType] = 0;
            }
            acc[regionName][departmentName][cityName][airportType]++;

            return acc;
        }, {});

        return grouped;
    };

    const renderGroupedByCity = (groupedData) => {
        return Object.entries(groupedData).map(([departmentName, cities]) => (
            <div key={departmentName} className="department-card">
                <h3>{departmentName}</h3>
                {Object.entries(cities).map(([cityName, airports]) => (
                    <div key={cityName}>
                        <h4>{cityName}</h4>
                        <ul className="city-list">
                            {airports.map((airportName, index) => (
                                <li key={index}>{airportName}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        ));
    };

    const renderGroupedByRegion = (groupedData) => {
        return Object.entries(groupedData).map(([regionName, departments]) => (
            <div key={regionName}>
                <h3>{regionName}</h3>
                {Object.entries(departments).map(([departmentName, cities]) => (
                    <table key={departmentName} className="region-table">
                        <thead>
                            <tr>
                                <th>Departamento</th>
                                <th>Ciudad</th>
                                <th>Tipo</th>
                                <th>Conteo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.entries(cities).map(([cityName, types]) => (
                                Object.entries(types).map(([type, count]) => (
                                    <tr key={`${cityName}-${type}`}>
                                        <td>{departmentName}</td>
                                        <td>{cityName}</td>
                                        <td>{type}</td>
                                        <td>{count}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                ))}
            </div>
        ));
    };

    return (
        <div className="container">
            <div className="record-count">
                <RecordCount count={airports.length} entity="Airports" />
            </div>
            <div className="content">
                <div className="grouped-section">
                    <h2>Grouped by City</h2>
                    {renderGroupedByCity(groupAirportsByCity(airports))}
                </div>
                <div className="grouped-section">
                    <h2>Grouped by Region, Department, City, and Type</h2>
                    {renderGroupedByRegion(groupAirportsByRegion(airports))}
                </div>
            </div>
            <p className="response-time">API Response Time: {responseTime}ms</p>
        </div>
    );
};

export default AirportsView;
