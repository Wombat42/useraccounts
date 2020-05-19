import React from 'react';
import { Card, TextField, Typography } from '@material-ui/core';
import Table from '../../components/table';

export default function UserList() {
  const handleRowSelection = (event) => {
    console.log('yay!');
  };

  const tableProps = {
    columns: ['Name', 'Last Name', 'Something else'],
    rows: [['Andy', 'Flot', 'other dafdsta']],
  };

  return (
    <Card>
      <Typography variant="h1">Users</Typography>
      <div>
        <TextField label="Search" />
      </div>
      <div>
        <Table {...tableProps} onRowSelect={handleRowSelection} />
      </div>
    </Card>
  );
}
