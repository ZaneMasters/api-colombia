import React from 'react';
import Tabs from '../components/Tabs';
import PresidentsView from '../components/PresidentsView';
import AirportsView from '../components/AirportsView';
import AttractionsView from '../components/AttractionsView';

const Dashboard = () => {
    return (
        <>
            <div>
                <h2>Colombia Dashboard</h2>
                <Tabs tabs={['Presidents', 'Airports', 'Attractions']}>
                    {{
                        'Presidents': <PresidentsView />,
                        'Airports': <AirportsView />,
                        'Attractions': <AttractionsView />,
                    }}
                </Tabs>
            </div>
        </>
    );
};

export default Dashboard;
