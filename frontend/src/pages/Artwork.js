import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import LazyLoad from 'react-lazyload'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  gridList: {
    width: 800,
    maxWidth: '100%'
  },
  card: {
    maxHeight: 300,
    minHeight: 300,
    position: 'relative',
  },
  // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,
  title: {
    color: 'black',
    maxHeight: 20,
  },
  submenu: {
    color: 'grey',
    fontSize: 11,
    marginLeft: 15,
  },
}));

const Spinner = () => (
  <h5>Loading...</h5>
)

const Artwork = ({ filePath }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [pieces, setPieces] = useState(null)
  const [titles, setTitles] = useState(null)

  useEffect(() => {
    setPieces(null)
    setActiveStep(0)
    axios.get(`http://localhost:8888/files?path=${filePath}`).then((res) => {
      setPieces(res.data.files)
    })
    axios.get(`http://localhost:8888/titles?path=${filePath}`).then((res) => {
      console.log('title res: ', res)
      setTitles(res.data)
    })
  }, [filePath])

  const imageInfo = (fileName) => {
    if (!titles) return
    return titles.map((item) => {
      if (item.src === `${filePath}/${fileName}`) {
        return (
          <div key={item.title} style={{ height: 'auto' }}>
            <Typography>{item.title}</Typography>
            <Typography>{item.medium}</Typography>
            <Typography>{item.dimensions}</Typography>
            <Typography>{item.date}</Typography>
          </div>
        )
      }
      return null
    })
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  if (!pieces) {
    return <p>Loading...</p>
  }

  return (
    <main className={classes.content}>
    <Grid container
      direction='row'
      alignItems='center'
      justify='flex-start'
      className={classes.toolbar}
      spacing={3}>
      <Grid item xs={3}>
        <IconButton onClick={handleBack} disabled={activeStep === 0} >
          <ArrowBackIosIcon fontSize='small'/>
        </IconButton>
      </Grid>
      <Grid item xs={6}>
        {pieces ?
          <GridList cellHeight={700} cols={1} className={classes.gridList}>
          <GridListTile style={{ height: 'auto', marginBottom: 20 }} key={pieces[activeStep]} cols={1}>
            <LazyLoad key={pieces[activeStep]} placeholder={<Spinner/>}>
              <img src={require(`../img/${filePath}/${pieces[activeStep]}`)} alt={`Ciara-Post-${activeStep}`} height={'100%'} width={'100%'} />
            </LazyLoad>
          </GridListTile>
          {imageInfo(pieces[activeStep])}
          </GridList>
        : <p>Loading...</p> }
      </Grid>
      <Grid item xs={3}>
        <IconButton onClick={handleNext} disabled={activeStep === (pieces.length - 1)}>
          <ArrowForwardIosIcon fontSize='small' />
        </IconButton>
      </Grid>
    </Grid>
    </main>
  );
}

export default Artwork
