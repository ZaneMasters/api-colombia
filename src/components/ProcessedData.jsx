import React from 'react';

const ProcessedData = ({ data }) => (
    <div>
        <h4>Processed Data:</h4>
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
);

export default ProcessedData;
