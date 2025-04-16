import React, { useEffect, useState } from 'react';
import TableRow from './TableRow';
import './MyTable.css'; // Import the CSS file for responsive styles

export const styles = {
  oddRow: {
    background: '#635e5e87',
    color: 'white',
  },
  evenRow: {
    background: '#635e5e3e',
    color: 'white',
  },
  tableRowFocus: {
    background: '#E9D4D4',
  },
};

const MyTable = (props) => {
  const [heading, setHeading] = useState([]);
  const [body, setBody] = useState([]);

  // Update state only when props.data changes
  useEffect(() => {
    if (props.data) {
      setHeading(props.data.heading);
      setBody([...props.data.body]);
    }
  }, [props.data]); // Dependency array ensures this runs only when props.data changes

  const refreshData = () => {
    props.refreshData();
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>{heading && heading.map((head) => <th key={head}>{head}</th>)}</tr>
        </thead>
        <tbody>{body && body.map((row, index) => <TableRow key={index} row={row} rowIndex={index} refreshData={refreshData} />)}</tbody>
      </table>
    </div>
  );
};

export default MyTable;
