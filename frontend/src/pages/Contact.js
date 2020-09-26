import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    flexDirection: 'row',
    padding: theme.spacing(3),
  },
  // necessary for content to be below app bar
  toolbar: {
    offset: theme.mixins.toolbar,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: '50vw'
  },
  input: {
    marginBottom: '10px',
  }
}));

const Contact = () => {
  const classes = useStyles()
  const [state, setState] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({ name: '', email: '', subject: '', message: '' })
  const [isLoading, setLoading] = useState(false)

  function validateEmail (email) {
    const regexp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexp.test(email);
  }

  const validate = () => {
    let hasErrors = false

    const fields = Object.keys(state)
    const errorArr = {}
    fields.forEach((field) => {
      if (field === 'email' && !validateEmail(state[field])) {
        errorArr[field] = 'Please enter valid email'
        hasErrors = true
      } else if (state[field] === '') {
        errorArr[field] = 'This field is required'
        hasErrors = true
      }
    })
    setErrors(errorArr)
    return hasErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const hasErrors = validate()
    if (hasErrors) {
      setLoading(false)
      return
    }

    axios.post('https://us-central1-ciara-post-portfolio.cloudfunctions.net/api/email', state).then(() => {
        setState({ name: '', email: '', subject: '', message: '' })
        alert('Your message has been sent! I will be in contact shortly.')
        setLoading(false)
      })
  }

  const updateField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main className={classes.content}>
      <div className={classes.root}>
        <Typography paragraph>Fill out this form or <a href='mailto:ciaragspost@gmail.com'>email me</a> for inquiries</Typography>
      </div>
      <form className={classes.root} onSubmit={handleSubmit} noValidate>
          <TextField
            className={classes.input}
            label="Name"
            variant='outlined'
            name="name"
            value={state.name}
            onChange={updateField}
            helperText={errors.name}
          />
          <TextField
            className={classes.input}
            label="Email"
            variant="outlined"
            name="email"
            value={state.email}
            onChange={updateField}
            helperText={errors.email}
          />
          <TextField
            className={classes.input}
            label="Subject"
            variant="outlined"
            name="subject"
            value={state.subject}
            onChange={updateField}
            helperText={errors.subject}
          />
          <TextField
            className={classes.input}
            label="Message"
            multiline
            rows={6}
            name='message'
            variant='outlined'
            value={state.message}
            onChange={updateField}
            helperText={errors.message}
          />
          <Button
            className={classes.margin}
            type='submit'
            value='Submit'
            variant='outlined'
          >
            {isLoading ? <CircularProgress/> : 'Submit'}
          </Button>
      </form>
    </main>
  )
}

export default Contact
