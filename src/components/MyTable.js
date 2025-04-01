import React from 'react';
import TableRow from './TableRow';

export const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
    },
    th: {
      background: '#e0e0e0',
      fontWeight: 'bold',
      padding: '8px',
      textAlign: 'left',
    },
    oddRow: {
      background: '#f2f2f2',
    },
    evenRow: {
      background: '#fff',
    },
    td: {
      padding: '8px',
      textAlign: 'left',
    },
    tableRowFocus: {
        background: '#E9D4D4',
    },
    centerDiv: {
        textAlign: 'center'
    },
    centerDivTitle: {
        textAlign: 'center',
        fontFamily: 'opensans-bold',
        fontSize: '216%'
    },
    sectionDivs: {
        padding: '5%'
    },
    buttonAbsolute: {
        position: 'absolute'
    }
};

const MyTable = props =>  {

      if(props.data){
        var heading = props.data.heading;
        var body = props.data.body;
      }

      const refreshData = () => {
        props.refreshData();
      }
    
      return (
          <table style={styles.table}>
              <thead>
                  <tr>
                      {heading.map(head => <th key={head} style={styles.th}>{head}</th>)}
                  </tr>
              </thead>
              <tbody>
                  {body.map((row, index) => <TableRow key={index} row={row} rowIndex={index} refreshData={refreshData} />)}
              </tbody>
          </table>
      );
}

export default MyTable;