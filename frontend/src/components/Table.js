import React from 'react';
import mockGraphData from '../utils/mockGraphData.json';
import { DataGrid } from '@mui/x-data-grid';

const Table = (data) => {
  console.log(data);

  function transformRedshiftData(data) {
    const { modelData } = data;
    if (!modelData) throw new Error('Invalid model format');
    const { ColumnMetadata, Records } = data.modelData;

    const columns = ColumnMetadata.map((column) => ({
      field: column.label,
      headerName: column.label,
      flex: 1,
      minWidth: 125,
    }));

    const rows = Records.map((record, index) => {
      let row = { id: index };
      columns.forEach(({ field }, i) => {
        row[field] = [...Object.values(record[i])];
      });
      return row;
    });

    return {
      columns,
      rows,
    };
  }

  const { rows, columns } = transformRedshiftData(mockGraphData);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
      />
    </div>
  );
};

export default Table;
