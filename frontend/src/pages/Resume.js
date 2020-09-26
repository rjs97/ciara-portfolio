import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    textAlign: 'left'
  },
  header: {
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  link: {
    color: 'black',
    textDecoration: 'none',
    '& :hover': {
      textDecoration: 'underline'
    },
    '& :visited': {
      color: 'black',
      textDecoration: 'none'
    }
  }
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
      <Typography variant='body1' className={classes.link}>
        <a href={`https://stp.world/collections/bfa-show-2020`} target='_blank' rel='noopener noreferrer' className={classes.link}><i>BFA Show 2020</i>, Serving the People, June 2020</a>
      </Typography>
      <Typography variant='body1' className={classes.link} paragraph>
        <a href={`http://artpractice.space/`} target='_blank' rel='noopener noreferrer' className={classes.link}><i>Ways of Being a Ghost: Barnard BA Thesis</i>, Barnard College, June/July 2020</a>
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
      <Typography variant='body1' className={classes.link}>
        <a href={`https://www.publicartfund.org/`} target='_blank' rel='noopener noreferrer' className={classes.link}>Public Art Fund, Development Intern, New York, NY, 2018</a>
      </Typography>
      <Typography variant='body1'>
        HG Contemporary, Gallery Assistant, New York, NY 2017 
      </Typography>
      <Typography variant='body1'>
        Emory Arts Underground, Executive Board Member, Atlanta, GA, 2016-17
      </Typography>
      <Typography variant='body1' className={classes.link}>
        <a href={`https://www.creativesamoa.com/`} target='_blank' rel='noopener noreferrer' className={classes.link}>Tiapapata Art Center, Artist in Residence, Apia, Western Samoa, 2016</a>
      </Typography>
      <Typography variant='body1' className={classes.link} paragraph>
        <a href={`https://anneherrero.com/home.html`} target='_blank' rel='noopener noreferrer' className={classes.link}>Anne Herrero Studio, Apprentice, Fairfax, CA, 2015</a>
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
