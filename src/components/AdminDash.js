import React, { useEffect, useState } from 'react';
import MyTable from './MyTable';
import { getTableData } from '../data-service/pi-data-service';
import BarNav from './BarNav';
export const tableHeading = ['Team Name', 'Unit', 'Colour', 'Verified'];

const AdminDash = () => {
  const [tabledata, setTableData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = await getTableData();
        setTableData({ heading: tableHeading, body });
      } catch (error) {
        console.error('Error fetching table data:', error);
      }
    };

    fetchData();
  }, []);

  if (!tabledata) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BarNav />
      <div style={{ marginBottom: '5rem' }}>Welcome to top secret page, don’t share this with anyone.</div>
      <MyTable data={tabledata} />
    </>
  );
};

export default AdminDash;
