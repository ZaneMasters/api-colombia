import React, { useState } from 'react';

const Tabs = ({ tabs, children }) => {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    return (
        <div>
            <ul className="tabs">
                {tabs.map((tab) => (
                    <li 
                        key={tab} 
                        onClick={() => setActiveTab(tab)} 
                        className={tab === activeTab ? 'active' : ''}
                    >
                        {tab}
                    </li>
                ))}
            </ul>
            <div className="tab-content">
                {children[activeTab]}
            </div>
        </div>
    );
};

export default Tabs;
