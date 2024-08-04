import React from 'react';
import './Table.css';

const Table = ({ data }) => (
    <table>
        <thead>
        <tr>
            <th>articleid</th>
            <th>subarticleid</th>
            <th>articlename</th>
            <th>external_str_id</th>
            <th>ecrlongname</th>
        </tr>
        </thead>
        <tbody>
        {data.map((row, index) => (
            <tr key={index}>
                <td>{row.articleid}</td>
                <td>{row.subarticleid}</td>
                <td>{row.articlename}</td>
                <td>{row.external_str_id}</td>
                <td>{row.ecrlongname}</td>
            </tr>
        ))}
        </tbody>
    </table>
);

export default Table;