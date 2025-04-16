import React, { useState } from 'react';

import { styles } from './MyTable';
import Modal from 'react-modal';
import TeamData from './TeamData';

export const secondaryModalStyles = {
  content: {
    width: '100%',
    height: '100%',
    background: '#020202ff',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const TableRow = (props) => {
  const row = props.row;
  const rowIndex = props.rowIndex;

  const [rowHovered, setRowHovered] = useState(false);
  const [isSecondaryModalOpen, setSecondaryModal] = useState(false);

  const handleRowClick = async (event) => {
    // need to open model
    if (!isSecondaryModalOpen) {
      setSecondaryModal(true);
    }
    event.stopPropagation();
  };

  const getHoverOfRow = () => {
    return rowHovered ? styles.tableRowFocus : rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow;
  };

  const closeModal = (event) => {
    setRowHovered(false);
    setSecondaryModal(false);
    props.refreshData();
  };

  return (
    <tr
      id={`row-${rowIndex}`}
      tabIndex="0"
      className="table-row"
      onClick={handleRowClick}
      onMouseEnter={() => {
        setRowHovered(true);
      }}
      onMouseLeave={() => {
        setRowHovered(false);
      }}
    >
      {row.map((val, index) => (
        <td key={index} style={getHoverOfRow()}>
          {val}
        </td>
      ))}

      {isSecondaryModalOpen && (
        <Modal isOpen={isSecondaryModalOpen} onRequestClose={closeModal} style={secondaryModalStyles} contentLabel="Example Modal">
          <div style={{ textAlign: 'center', marginTop: '5rem' }}>
            <button onClick={closeModal}>Close</button>
          </div>

          <TeamData row={row} closeModal={closeModal} />
        </Modal>
      )}
    </tr>
  );
};

export default TableRow;
