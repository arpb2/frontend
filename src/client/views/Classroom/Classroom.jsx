import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Students, Professor, CurrentLevel } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  professor: {
    marginBottom: theme.spacing(4),
  },
  currentLevel: {
    marginTop: theme.spacing(4),
  },
}));

const Classroom = (props) => {
  const {
    className, history, ...rest
  } = props;
  const classes = useStyles();
  const { id } = useParams();

  const [classroom, setClassroom] = useState(null);

  useEffect(() => {
    if (!classroom) {
      fetch(`/api/classrooms/${id}`)
        .then(res => res.json())
        .then((json) => {
          setClassroom(json);
        });
    }
  });

  return (
    <div className={classes.root}>
      {classroom
      && (
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          md={9}
          xs={12}
        >
          <Students classroomId={classroom.id} history={history} />
        </Grid>
        <Grid
          container
          item
          direction="column"
          md={3}
          xs={12}
        >
          <Grid
            item
            className={classes.professor}
          >
            <Professor classroomId={classroom.id} />
          </Grid>
          <Grid
            item
          >
            <CurrentLevel classroom={classroom} />
          </Grid>
        </Grid>
      </Grid>
      )}
    </div>
  );
};

export default Classroom;
