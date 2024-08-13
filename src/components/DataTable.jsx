import React from 'react';

const DataTable = ({ data }) => (
    <table>
        <thead>
            <tr>
                {Object.keys(data[0] || {}).map(key => <th key={key}>{key}</th>)}
            </tr>
        </thead>
        <tbody>
            {data.map((item, index) => (
                <tr key={index}>
                    {Object.values(item).map((value, i) => <td key={i}>{value}</td>)}
                </tr>
            ))}
        </tbody>
    </table>
);

export default DataTable;
