import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  gridList: {
    width: '75vw',
    maxHeight: '90vh',
    maxWidth: '100%',
    overflow: 'hidden',
    '& .MuiGridListTile-imgFullWidth': {
      transform: 'none'
    },
    [(theme.breakpoints.down('sm'))]: {
      width: '110vw'
    }
  },
  card: {
    maxHeight: 300,
    minHeight: 300,
    position: 'relative',
  },
  // necessary for content to be below app bar
  // toolbar: {
  //   [(theme.breakpoints.down('sm'))]: {
  //     transform: 'translateX(-5%)'
  //   },
  // },
  title: {
    color: 'black',
    maxHeight: 20,
  },
  submenu: {
    color: 'grey',
    fontSize: 11,
    marginLeft: 15,
  },
  caption: {
    fontSize: '1rem',
    [(theme.breakpoints.down('sm'))]: {
      fontSize: '.8rem'
    }
  }
}))

const fileStructure = {
  'BAThesis': {
    size: 13,
    filePrefix: 'Ciara-Post'
  },
  'SelectedWorks': {
    size: 6,
    filePrefix: 'Ciara-Post-SW'
  }
}

const Artwork = ({ filePath }) => {
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(1)
  const [titles, setTitles] = useState(null)

  useEffect(() => {
    setActiveStep(1)
    axios.get(`https://us-central1-ciara-post-portfolio.cloudfunctions.net/api/titles?path=${filePath}`).then((res) => {
      setTitles(res.data)
    })
  }, [filePath])

  const imageInfo = (fileName) => {
    if (!titles) return
    return titles.map((item) => {
      if (item.src === `${filePath}/${fileName}`) {
        return (
          <div key={item.title} style={{ height: 'auto' }}>
            <Typography className={classes.caption}>{item.title}</Typography>
            <Typography className={classes.caption}>{item.medium}</Typography>
            <Typography className={classes.caption}>{item.dimensions}</Typography>
            <Typography className={classes.caption}>{item.date}</Typography>
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

  return (
    <main className={classes.content}>
    <Grid container
      direction='row'
      alignItems='center'
      justify='center'
      className={classes.toolbar}
      >
      <Grid item xs={3}>
        <IconButton onClick={handleBack} disabled={activeStep === 1} >
          <ArrowBackIosIcon fontSize='small'/>
        </IconButton>
      </Grid>
      <Grid item xs={6}>
          <GridList cols={1} className={classes.gridList}>
          <GridListTile style={{ height: '100%', display: 'block', marginBottom: 20 }} key={`Ciara-Post-${activeStep}`} cols={1}>
            <img src={require(`../img/${filePath}/${fileStructure[filePath].filePrefix}-${activeStep}.jpg`)} alt={`Ciara-Post-${activeStep}`} height={'100%'} width={'100%'} />
            {imageInfo(`${fileStructure[filePath].filePrefix}-${activeStep}.jpg`)}
          </GridListTile>
          </GridList>
      </Grid>
      <Grid item xs={3}>
        <IconButton onClick={handleNext} disabled={activeStep === (fileStructure[filePath].size)}>
          <ArrowForwardIosIcon fontSize='small' />
        </IconButton>
      </Grid>
    </Grid>
    </main>
  );
}

export default Artwork
