import React from 'react'
import Typography from 'material-ui/Typography'

export default class extends React.Component {
  render() {
    return (
      <div>
        <Typography type="title" gutterBottom>
          Commands:
        </Typography>
        <Typography type="subheading" gutterBottom>
          <b>Delete:</b> click on node, then key "delete" <br/>
          <b>Edit:</b> double click on node, should appear one modal <br/>
          <b>Multi select:</b> shift + drag area on nodes <br/>
        </Typography>

        <br/>
        <br/>
        
        <Typography type="title" gutterBottom>
          Stack:
        </Typography>
        <Typography type="subheading" gutterBottom>
          create-react-app <br/>
          react-router v4 <br/>
          material-ui v1 <br/>
          react-js-diagrams <br/>
          localstorage <br/>
        </Typography>
      </div>
    )
  }
}
