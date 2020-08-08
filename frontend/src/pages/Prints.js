import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import LazyLoad from 'react-lazyload'
import axios from 'axios'


const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: '50px 15%',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  card: {
    maxHeight: 300,
    minHeight: 300,
    position: 'relative',
  },
  cardActions: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  caption: {
    fontSize: 12,
  },
}));

const Spinner = () => (
  <h5>Loading...</h5>
)

const Prints = () => {
  const classes = useStyles()
  const [pieces, setPieces] = useState(null)
  const [titles, setTitles] = useState(null)
  const filePath = 'BAThesis'

  useEffect(() => {
    setPieces(null)
    axios.get(`http://localhost:8888/files?path=${filePath}`).then((res) => {
      setPieces(res.data.files)
    })
    axios.get(`http://localhost:8888/titles?path=${filePath}`).then((res) => {
      setTitles(res.data)
    })
  }, [filePath])

  const imageInfo = (fileName) => {
    if (!titles) return
    return titles.map((item) => {
      if (item.src === `${filePath}/${fileName}`) {
        return (
          <CardContent key={fileName} style={{ height: 'auto' }}>
            <Typography className={classes.caption}>{item.title}</Typography>
            <Typography className={classes.caption}>{item.medium}</Typography>
            <Typography className={classes.caption}>{item.dimensions}</Typography>
            <Typography className={classes.caption}>{item.date}</Typography>
          </CardContent>
        )
      }
      return null
    })
  }

  const printCards = () => {
    if (!pieces) return
    return pieces.map((print, i) => {
      return (
        <Grid item key={print} xs={4}>
          <Card className={classes.card}>
            <CardActionArea style={{ width: '100%', height: 150, margin: '5px auto' }}>
              <LazyLoad key={print} placeholder={<Spinner/>}>
                <img src={require(`../img/${filePath}/${print}`)} alt={`Ciara-Post-${i}`} height={150} width={'auto'} />
              </LazyLoad>
            </CardActionArea>
            {imageInfo(print)}
            <CardActions className={classes.cardActions}>
              <Button style={{ marginLeft: 'auto' }} size='small'>
                Purchase
              </Button>
            </CardActions>
          </Card>
        </Grid>
      )
    })
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
        {printCards()}
    </Grid>
    </main>
  )
}

export default Prints
