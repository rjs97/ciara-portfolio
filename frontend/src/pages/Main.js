import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import AddArtwork from '../components/AddArtwork'
import Artwork from './Artwork'
import Resume from './Resume'
import Contact from './Contact'
import Statement from './Statement'
import Sidebar from '../components/Sidebar'
import Grid from '@material-ui/core/Grid'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}))

const Main = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
    <Grid container
      direction='row'
      alignItems='center'
      justify='flex-start'
      className={classes.toolbar}
      >
        <Grid item xs={1} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={11} md={9}>
          <Switch>
            <Route exact path='/' component={() => <Artwork filePath={'BAThesis'} />}></Route>
            <Route exact path='/bathesis' component={() => <Artwork filePath={'BAThesis'} />}></Route>
            <Route exact path='/bathesis/statement' component={Statement}></Route>
            <Route exact path='/selected' component={() => <Artwork filePath={'SelectedWorks'} />}></Route>
            <Route exact path='/cv' component={Resume}></Route>
            <Route exact path='/contact' component={Contact}></Route>
            <Route exact path='/add' component={AddArtwork}></Route>
          </Switch>
        </Grid>
    </Grid>
    </div>
  );
}

export default Main
