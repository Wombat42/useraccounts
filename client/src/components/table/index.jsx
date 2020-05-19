import React from 'react';
import PropTypes from 'prop-types';
import {
  TableContainer,
  Table as MUITable,
  TableHead,
  TableCell,
  TableBody,
  TableRow as MUITableRow,
} from '@material-ui/core';

function TableRow(props) {
  const { key, cells, onRowSelect } = props;
  console.log(cells, 'fdfd');
  return (
    <MUITableRow key={key} onClick={onRowSelect}>
      {cells.map((cell, index) => (
        <TableCell key={`${key}_${index}`}>{cell}</TableCell>
      ))}
    </MUITableRow>
  );
}

TableRow.defaultProps = {
  key: '',
  cells: [],
};

export default function Table(props) {
  const { columns, rows, onRowSelect } = props;
  console.log('hey', columns);
  return (
    <TableContainer>
      <MUITable>
        <TableHead>
          <TableRow cells={columns} />
        </TableHead>
        <TableBody>
          {rows.map((cells, index) => (
            <TableRow
              key={index}
              cells={cells}
              onRowSelect={onRowSelect}
            />
          ))}
        </TableBody>
      </MUITable>
    </TableContainer>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  handleRowSelection: PropTypes.func,
};

Table.defaultprops = {
  handleRowSelection: () => {},
};
