import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Input from '@material-ui/core/Input'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing(1),
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

export default function AddArtwork () {
  const [title, setTitle] = useState('')
  const [medium, setMedium] = useState('')
  const [dimensions, setDimensions] = useState('')
  const [source, setSource] = useState('')
  const [date, setDate] = useState('')
  const [path, setPath] = useState('')

  const classes = useStyles();

  const handleSubmit = (e) => {
    e.preventDefault()
    const fileName = `${path}/${source}`
    console.log('fileName: ', fileName)
    axios.post('http://localhost:8888/add', { src: fileName, title, medium, dimensions, date })
      .then(() => {
        window.location.href = 'https://ciara-post-portfolio.web.app/add'
      })
  }

  const handleUpload = (e) => {
    console.log(e.target.files[0].name)
    setSource(e.target.files[0].name)
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit} noValidate>
      <TextField
        className={classes.input}
        label="Title"
        variant="outlined"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        className={classes.input}
        label="Medium"
        variant="outlined"
        name="medium"
        value={medium}
        onChange={(e) => setMedium(e.target.value)}
      />
      <TextField
        className={classes.input}
        label="Dimensions"
        variant="outlined"
        name="dimensions"
        value={dimensions}
        onChange={(e) => setDimensions(e.target.value)}
      />
      <TextField
        className={classes.input}
        label="Date"
        variant="outlined"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <TextField
        className={classes.input}
        label="Path"
        variant="outlined"
        name="path"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        helperText="ex: for BAThesis/Ciara-Post-3.jpg, enter BAThesis"
      />
      <FormControl>
        <Input
          accept="image/*"
          style={{ display: 'none' }}
          id="file-button"
          type="file"
          onChange={handleUpload}
        />
        <label htmlFor="file-button">
          <Button
            variant="contained"
            color="default"
            component="span"
            className={classes.margin}
            startIcon={<CloudUploadIcon />}
          >
            Upload
          </Button>
        </label>
        <Typography>{source}</Typography>
      </FormControl>
      <Button
        className={classes.margin}
        type='submit'
        value='Submit'
        variant='contained'
      >
      Submit
      </Button>
    </form>
  );
}
