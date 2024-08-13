import React, { useEffect, useState } from 'react';
import { getTouristicAttractions } from '../services/apiService';
import RecordCount from './RecordCount';
import '../styles/AttractionsView.css'; // Importa el archivo CSS

const AttractionsView = () => {
    const [attractions, setAttractions] = useState([]);
    const [responseTime, setResponseTime] = useState(0);
    const [sortOption, setSortOption] = useState('alphabetical'); // Opción de ordenamiento

    useEffect(() => {
        const fetchData = async () => {
            const startTime = Date.now();
            const data = await getTouristicAttractions();
            setAttractions(data);
            setResponseTime(Date.now() - startTime);
        };
        fetchData();
    }, []);

    const groupAttractions = (attractions) => {
        const grouped = attractions.reduce((acc, attraction) => {
            const city = attraction.city.name;
            if (!acc[city]) acc[city] = [];
            acc[city].push(attraction);
            return acc;
        }, {});
        return grouped;
    };

    const groupedAttractions = groupAttractions(attractions);

    const sortCities = (cities) => {
        return cities.sort((a, b) => {
            if (sortOption === 'alphabetical') {
                return a[0].localeCompare(b[0]); // Orden alfabético por nombre de ciudad
            } else if (sortOption === 'numberOfAttractions') {
                return b[1].length - a[1].length; // Orden por número de atracciones (descendente)
            }
            return 0;
        });
    };

    const sortedCities = sortCities(Object.entries(groupedAttractions));

    const handleSortChange = (event) => {
        setSortOption(event.target.value);
    };

    return (
        <div className="attractions-container">
            <RecordCount count={attractions.length} entity="Attractions" />

            <div className="sort-options">
                <label>
                    <input
                        type="radio"
                        value="alphabetical"
                        checked={sortOption === 'alphabetical'}
                        onChange={handleSortChange}
                    />
                    Orden Alfabético
                </label>
                <label>
                    <input
                        type="radio"
                        value="numberOfAttractions"
                        checked={sortOption === 'numberOfAttractions'}
                        onChange={handleSortChange}
                    />
                    Orden por Número de Atracciones
                </label>
            </div>

            <div className="cities-grid">
                {sortedCities.map(([city, attractions]) => (
                    <div key={city} className="city-card">
                        <h2>{city}</h2>
                        <ul>
                            {attractions.map((attraction) => (
                                <li key={attraction.id}>{attraction.name}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <p>API Response Time: {responseTime}ms</p>
        </div>
    );
};

export default AttractionsView;
