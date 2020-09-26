import React, { useState } from 'react'
import { useTheme } from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core/styles'
import Collapse from '@material-ui/core/Collapse'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import { Link as RouterLink, useLocation } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const drawerWidth = 225

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
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
  },
  menuIcon: {
    display: 'block',
    position: 'absolute',
    top: 20,
    left: 20
  },
  closeIcon: {
    display: 'block',
    position: 'absolute',
    top: 20,
    right: 20,
  }
}));

const fileMap = {
  'Selected Works': '/selected',
  'BA Thesis': '/bathesis',
  'Thesis Statement': '/bathesis/statement',
  'CV': '/cv',
  'Contact': '/contact'
}

const Sidebar = () => {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [open, setOpen] = useState(false)
  const [drawer, setDrawer] = useState(false)

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleDrawerOpen = () => {
    setDrawer(!drawer)
  }

  const ListItemLink = (props) => {
    const { to, primary, ...other } = props
    const path = useLocation()

    if (to === '/bathesis/statement') {
      return (
        <Collapse in={mobile || (path.pathname === '/' || path.pathname === '/bathesis' || path.pathname === '/bathesis/statement')}>
          <List component="div" disablePadding>
            <ListItem button selected={path.pathname === '/bathesis/statement'} component={RouterLink} to={to} {...other} >
              <ListItemText className={classes.listItem} style={{ paddingLeft: 60 }} primary="Thesis Statement" />
            </ListItem>
          </List>
        </Collapse>
      )
    }

    if (to === '/bathesis') {
      return (
        <ListItem button onClick={handleOpen} selected={(path.pathname === '/' || path.pathname === '/bathesis')} component={RouterLink} to={to} {...other}>
          <ListItemText className={classes.listItem} style={{ paddingLeft: 40 }} primary={primary} />
        </ListItem>
      )
    }

    return (
      <ListItem button selected={(to === path.pathname) || (path.pathname === '/' && to === '/bathesis')} component={RouterLink} to={to} {...other}>
        <ListItemText className={classes.listItem} style={{ paddingLeft: 40 }} primary={primary} />
      </ListItem>
    )
  }

  return (
    <div>
    { mobile ?
      <div>
      <IconButton
        onClick={handleDrawerOpen}
        className={classes.menuIcon}
        edge='start'
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        classes={{
          paper: classes.drawerPaper,
        }}
        open={drawer}
        onClick={handleDrawerOpen}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <IconButton
            edge='end'
            className={classes.closeIcon}
          >
            <CloseIcon />
          </IconButton>
        </div>
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
      </div>
      :
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
    }
    </div>
  )
}

export default Sidebar
