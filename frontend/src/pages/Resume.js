import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    textAlign: 'left',
  },
  header: {
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
}));

const Resume = () => {
  const classes = useStyles()

  return (
    <main className={classes.content}>
    <Grid container
      direction='column'
      alignItems='flex-start'
      justify='flex-start'
      className={classes.toolbar}>
      <Typography variant='h6' className={classes.header}>
        EXHIBITIONS
      </Typography>
      <Typography variant='body1'>
        <i>BFA Show 2020</i>, Serving the People, June 2020
      </Typography>
      <Typography variant='body1' paragraph>
        <i>Ways of Being a Ghost: Barnard BA Thesis</i>, Barnard College, June/July 2020
      </Typography>
      <Typography variant='h6' className={classes.header}>
        ACADEMIC AND PROFESSIONAL HONORS
      </Typography>
      <Typography variant='body1'>
        Fulbright ETA Scholar, Sri Lanka, 2020-21 
      </Typography>
      <Typography variant='body1'>
        Phi Beta Kappa, Barnard College, 2020
      </Typography>
      <Typography variant='body1'>
        Magna Cum Laude, Barnard College, 2020
      </Typography>
      <Typography variant='body1'>
        Departmental Honors in Visual Arts and Human Rights, Barnard College, 2020 
      </Typography>
      <Typography variant='body1' paragraph>
        Dennis Dalton & Peter Juviler Human Rights Fellowship, 2018
      </Typography>
      <Typography variant='h6' className={classes.header}>
        PROFESSIONAL EXPERIENCE
      </Typography>
      <Typography variant='body1'>
        Barnard College, Website and Catalogue Designer, Art History Department, 2020 
      </Typography>
      <Typography variant='body1'>
        Public Art Fund, Development Intern, New York, NY, 2018
      </Typography>
      <Typography variant='body1'>
        HG Contemporary, Gallery Assistant, New York, NY 2017 
      </Typography>
      <Typography variant='body1'>
        Emory Arts Underground, Executive Board Member, Atlanta, GA, 2016-17
      </Typography>
      <Typography variant='body1'>
        Tiapapata Art Center, Artist in Residence, Apia, Western Samoa, 2016
      </Typography>
      <Typography variant='body1' paragraph>
        Anne Herrero Studio, Apprentice, Fairfax, CA, 2015
      </Typography>
      <Typography variant='h6' className={classes.header}>
        EDUCATION
      </Typography>
      <Typography variant='body1' paragraph>
        Barnard College, BA, New York, 2020
      </Typography>
    </Grid>
    </main>
  );
}

export default Resume
