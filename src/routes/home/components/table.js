import React from 'react'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Paper from 'material-ui/Paper'

import Button from 'material-ui/Button'
import IconDelete from 'material-ui-icons/Delete'
import IconOpen from 'material-ui-icons/OpenInNew'
// import IconEdit from 'material-ui-icons/Create'

const styleSheet = createStyleSheet(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}))

// style={{ marginRight: 10 }}
const DiagramsTable = ({ classes, items, deleteDiagram, openDiagram }) => (
  <Paper className={classes.paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell numeric style={{ width: 50 }}>ID</TableCell>
          <TableCell>Name</TableCell>
          <TableCell style={{ width: 230 }}>Created at</TableCell>
          <TableCell style={{ width: 230 }}>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map(n => {
          return (
            <TableRow key={n.id}>
              <TableCell numeric>
                {n.id}
              </TableCell>
              <TableCell>
                {n.name}
              </TableCell>
              <TableCell>
                {n.createdAt}
              </TableCell>
              <TableCell style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Button
                  raised
                  onClick={() => openDiagram(n.id)}
                  style={{ marginRight: 10 }}
                  color="primary">
                    <IconOpen /> Open
                </Button>

                {/*
                  <Button
                    raised
                    onClick={() => editDiagram(n.id)}
                    style={{ marginRight: 10 }}
                    color="primary">
                      <IconEdit /> Edit
                  </Button>
                */}

                <Button
                  raised
                  onClick={() => deleteDiagram(n.id)}
                  color="accent">
                    <IconDelete /> Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </Paper>
)

export default withStyles(styleSheet)(DiagramsTable)
