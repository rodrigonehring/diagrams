import React from 'react';
import { NavLink } from 'react-router-dom'
import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/BubbleChart';

const styleSheet = createStyleSheet({
  bar: {
    marginBottom: 20,
  },
  flex: {
    flex: 1,
  },
  content: {
    padding: 15,
  },
});

function ButtonAppBar(props) {
  const classes = props.classes;
  return (
    <div>
      <AppBar position="static" className={classes.bar}>
        <Toolbar>
          <IconButton color="contrast" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" className={classes.flex}>
            Diagram Maker 2000
          </Typography>
          <NavLink to="/">
            <Button color="contrast">home</Button>
          </NavLink>
          <NavLink to="/about">
            <Button color="contrast">About</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  );
}

export default withStyles(styleSheet)(ButtonAppBar);
