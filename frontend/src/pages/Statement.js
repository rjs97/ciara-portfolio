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
  toolbar:  {
    maxWidth: '60vw'
  }
}));

const Statement = () => {
  const classes = useStyles()

  return (
    <main className={classes.content}>
    <Grid container
      direction='column'
      alignItems='flex-start'
      justify='flex-start'
      className={classes.toolbar}>
      <Typography variant='body1' paragraph>
      The Funster climbs The Diamond Spire. Reaching the top, he devours a humungous peach.
      Its juice drips off of his fingers and forms a dark stain of words on the ground:
      “Truth is dispatched from the desert on a sword.” Another drip: “The weeds of discontent
      flourish in the exposed soil of an unplanned morrow.” Drip, drip: “Dedicated to Sandra who
      has always made all things possible.”
      </Typography>
      <Typography variant='body1' paragraph>
      When I was 16 and Ed was 12, there were two large peach pits lying on the table in front of him.
      He first denied knowledge of my legal rights to the peaches. Then he closed his hands under the table
       and multiplied them by two; he turned them into four concrete corners. And then he added a chair,
       some colored glass, and three spoons.
      </Typography>
      <Typography variant='body1' paragraph>
      And with that, he invariably had fun. The impish grin ended up in the walls and in the tiles,
      in the window panes, and in the floor boards. But with a scratch, and a puff of cigar smoke,
      the grin turned back into peach juice. So I stood on his ground, sanding the scratches with my
      callused feet and building blue windows that would be sharp enough to cut fruit.
      </Typography>
    </Grid>
    </main>
  );
}

export default Statement
