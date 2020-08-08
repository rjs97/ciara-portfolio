import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  titleContainer: {
    marginLeft: 30,
    padding: 8,
  },
  title: {
    color: 'black',
    fontSize: 23,
  }
}));

const fileMap = {
  'BA Thesis': '/bathesis',
  'Selected Works': '/selected',
  'CV': '/cv',
  'Contact': '/contact'
}

const ListItemLink = (props) => {
  const { to, open, primary, ...other } = props
  const path = useLocation()

  return (
    <ListItem button selected={(to === path.pathname) || (path.pathname === '/' && to === '/bathesis')} component={RouterLink} to={to} {...other} >
      <ListItemText style={{ paddingLeft: 40 }}inset primary={primary} />
    </ListItem>
  )
}

const Sidebar = () => {
  const classes = useStyles()

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <List
      subheader={
        <RouterLink style={{ textDecoration: 'none' }} to={'/'}>
        <ListSubheader className={classes.titleContainer} component="div" id="nav-bar-subheader">
          <Typography className={classes.title} align='left'> Ciara Post </Typography>
        </ListSubheader>
        </RouterLink>
      }>
        {Object.keys(fileMap).map((text) => (
          <ListItemLink key={text} primary={text} to={fileMap[text]}>
          </ListItemLink>
        ))}
      </List>
    </Drawer>
  )
}

export default Sidebar
