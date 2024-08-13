import React from 'react';

const RecordCount = ({ count, entity }) => (
    <div>
        <h3>Total {entity}: {count}</h3>
    </div>
);

export default RecordCount;
