import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  footer: {
    position: 'fixed',
    fontSize: 10,
    bottom: 0,
    alignItems: 'center'
  },
  content: {
    flexGrow: 1,
    flexDirection: 'row',
    width: '100vw'
  },
}));

const Footer = () => {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      <Typography className={classes.footer} align='left'> Site created by Jaya Subrahmanyan </Typography>
    </main>
  )
}

export default Footer
