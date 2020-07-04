/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect, Fragment } from 'react';
import {
  TextField, Button, ButtonGroup, Grid, Typography, Paper, Container, Snackbar, Hidden,
} from '@material-ui/core';
import ReactBlockly from 'react-blockly';
import Blockly from 'blockly';
import { makeStyles } from '@material-ui/styles';
import SaveIcon from '@material-ui/icons/Save';
import BuildIcon from '@material-ui/icons/Build';
import SendIcon from '@material-ui/icons/Send';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import lua from 'react-syntax-highlighter/dist/esm/languages/hljs/lua';
import php from 'react-syntax-highlighter/dist/esm/languages/hljs/php';
import dart from 'react-syntax-highlighter/dist/esm/languages/hljs/dart';
import darcula from 'react-syntax-highlighter/dist/esm/styles/hljs/darcula';
import { Steps } from 'intro.js-react';
import MuiAlert from '@material-ui/lab/Alert';
import { useParams } from 'react-router-dom';
import parseWorkspaceXml from './BlocklyHelper';


import 'blockly/python';
import 'blockly/php';
import 'blockly/lua';
import 'blockly/javascript';
import 'blockly/dart';
import './blocks/custom/blocks';
import 'intro.js/introjs.css';

SyntaxHighlighter.registerLanguage('javascript', javascript);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('lua', lua);
SyntaxHighlighter.registerLanguage('php', php);
SyntaxHighlighter.registerLanguage('dart', dart);

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
  },
  blockly: {
    minHeight: '60vh',
  },
  '@media (min-width: 400px)': {
    theory: {
      minHeight: '60vh',
    },
  },
  theory: {
    padding: '8px',
  },
  tooltip: {
    fontFamily: 'roboto',
  },
}));

const useViewport = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleWindowResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  return { width, height };
};

const MyBlockly = (props) => {
  const {
    className, onChange, style, history, ...rest
  } = props;

  const { id } = useParams();

  const classes = useStyles();

  const { width } = useViewport();
  const breakpoint = 620;

  const languages = [
    {
      value: 'JavaScript',
      label: 'JavaScript',
    },
    {
      value: 'Python',
      label: 'Python',
    },
    {
      value: 'Lua',
      label: 'Lua',
    },
    {
      value: 'Dart',
      label: 'Dart',
    },
    {
      value: 'PHP',
      label: 'PHP',
    },
  ];

  const [values, setValues] = useState({
    language: 'JavaScript',
    currentCode: '',
    toolboxCategories: null,
    runnableCode: '',
    currentLevel: {
      title: null,
      objective: null,
    },
    stepsEnabled: false, // TODO: Change when prod ready, it's annoying for development
    initialStep: 0,
    steps: [
      {
        element: '.step-one',
        intro: 'Creá tu solución usando bloques de código',
        tooltipClass: classes.tooltip,
      },
      {
        element: '.step-two',
        intro: 'Mirá el código resultante acá',
        tooltipClass: classes.tooltip,
      },
      {
        element: '.step-three',
        intro: '¡Podés incluso cambiar el lenguaje!',
        tooltipClass: classes.tooltip,
      },
      {
        element: '.step-four',
        intro: 'Ejecutá tu código para ver el resultado',
        tooltipClass: classes.tooltip,
      },
      {
        element: '.step-five',
        intro: 'En cualquier momento podes pasar el siguiente nivel',
        tooltipClass: classes.tooltip,
      },
    ],
  });

  const [open, setOpen] = useState(false);

  const [snackbar, setSnackbar] = useState({ severity: '', message: '' });

  useEffect(() => {
    fetch('/api/blockly/initial')
      .then(res => res.text())
      .then((xml) => {
        setValues(v => ({ ...v, toolboxCategories: parseWorkspaceXml(xml) }));
      });
  }, []);

  useEffect(() => {
    fetch(`/api/levels/${id}`)
      .then((res) => {
        if (res.status !== 200) {
          history.push('/not-found');
        }
        return res.json();
      })
      .then((level) => {
        setValues(v => ({
          ...v,
          currentLevel: {
            title: level.name,
            objective: level.objective.title,
          },
        }));
      });
  }, [values.currentLevel.title, history, id]);

  const [runLink, setRunLink] = useState('');
  const [codeWasBuilt, setCodeWasBuilt] = useState(false);


  const handleSave = () => {
    const workspace = Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(values.workspace));
    const session = JSON.parse(localStorage.getItem('session'));
    fetch('/api/code', {
      method: 'POST',
      body: JSON.stringify({
        code: values.runnableCode,
        workspace: btoa(workspace),
        userId: session.user_id,
        levelId: 1, // TODO: Get from route
      }),
      headers: {
        Authentication: session.token,
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      if (!res.ok) throw new Error();
      res.json();
    })
      .then((res) => {
        setSnackbar({ severity: 'success', message: 'Código guardado!' });
        setOpen(true);
      }).catch((err) => {
        setSnackbar({ severity: 'error', message: 'Ocurrió un error al guardar el código' });
        setOpen(true);
      });
  };

  const regenCode = (language, workspace) => ({
    compiled: Blockly[language].workspaceToCode(workspace || values.workspace),
    runnable: Blockly.JavaScript.workspaceToCode(workspace || values.workspace),
  });

  const handleLanguageChange = (event) => {
    const newCode = regenCode(event.target.value);
    setValues({
      ...values,
      language: event.target.value,
      currentCode: newCode.compiled,
      runnableCode: newCode.runnable,
    });
  };

  const workspaceDidChange = (workspace) => {
    setCodeWasBuilt(false);
    const newCode = regenCode(values.language, workspace);
    setValues({
      ...values, workspace, currentCode: newCode.compiled, runnableCode: newCode.runnable,
    });
  };

  const handleNextLevel = f => (e) => {
    window.location.href = window.location.href.replace(/blockly.*/, `blockly/${parseInt(id, 10) + 1}`);
  };

  const buildCode = () => {
    window.LoopTrap = 1000;
    Blockly.JavaScript.INFINITE_LOOP_TRAP = 'if(--window.LoopTrap == 0) throw "Infinite loop.";\n';
    const url = new URL('uniwebview://arpb2');
    try {
      eval(values.runnableCode);
    } catch (e) {
      setSnackbar({ severity: 'error', message: 'Ocurrió un error a ejecutar el código. Verifique si no tiene errores o reintente más tarde' });
      setOpen(true);
    }
    setRunLink(url.toString());
    setCodeWasBuilt(true);
  };

  const onExit = () => {
    setValues({ ...values, stepsEnabled: false });
  };

  const Alert = alertProps => <MuiAlert elevation={6} variant="filled" {...alertProps} />;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const formatObjective = () => values.currentLevel.objective.split('\\n').map((item, i) => (
    <Typography key={i} variant="body1" paragraph>
      {item}
    </Typography>
  ));

  return (
    <Container className={classes.root} maxWidth={false}>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Grid container direction="column" spacing={2}>
        <Steps
          enabled={values.stepsEnabled}
          steps={values.steps}
          initialStep={values.initialStep}
          onExit={onExit}
        />
        <Grid item id="levelNumber" sm={9} xs={12} className={classes.level}>
          <Typography variant="h1">{values.currentLevel.title}</Typography>
        </Grid>
        <Grid
          container
          item
          spacing={2}
        >
          <Grid xs={12} sm={9} item id="blockly" className={classes.blockly}>
            {values.toolboxCategories && (
            <ReactBlockly.BlocklyEditor
              toolboxCategories={values.toolboxCategories}
              workspaceConfiguration={{
                grid: {
                  spacing: 20,
                  length: 3,
                  colour: '#ccc',
                  snap: true,
                },
              }}
              initialXml={
                          '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>'
                      }
              wrapperDivClassName="fill-height"
              workspaceDidChange={workspaceDidChange}
              className="step-one"
            />
            )}
          </Grid>
          <Grid item xs={12} sm={3} id="theory" className={classes.theory}>
            <Paper className={classes.theory}>
              {values.currentLevel.objective && formatObjective()}
            </Paper>
          </Grid>
        </Grid>
        <Grid container item spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              fullWidth
              label="Seleccione el lenguaje"
              margin="dense"
              name="language"
              onChange={handleLanguageChange}
              select
              SelectProps={{ native: true }}
              value={values.language}
              variant="outlined"
              className="step-three"
            >
              {languages.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item container spacing={2} xs={12} sm={9} className="step-four" alignItems="center" alignContent="center">
            {width < breakpoint ? (
              <Fragment>
                <Grid item xs={12}>
                  <ButtonGroup variant="contained" aria-label="ARPB2 control btn group 2" fullWidth>
                    <Button onClick={buildCode} startIcon={<BuildIcon />}>
                      Compilar
                    </Button>
                    <Button
                      disabled={!codeWasBuilt}
                      href={runLink}
                      startIcon={<SendIcon />}
                    >
                      Ejecutar
                    </Button>
                  </ButtonGroup>
                </Grid>
                <Grid item xs={12}>
                  <ButtonGroup variant="contained" aria-label="ARPB2 control btn group 1" fullWidth>
                    <Button
                      onClick={handleSave}
                      startIcon={<SaveIcon />}
                    >
                      Guardar
                    </Button>
                    <Button
                      href="uniwebview://arpb2?action=move_forward&amp;action=rotate_left&amp;action=move_forward"
                    >
                      Mock
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Fragment>
            )
              : (
                <ButtonGroup variant="contained" aria-label="ARPB2 control btn group" fullWidth>
                  <Button
                    onClick={handleSave}
                    startIcon={<SaveIcon />}
                  >
                    Guardar
                  </Button>
                  <Button onClick={buildCode} startIcon={<BuildIcon />}>
                    Compilar
                  </Button>
                  <Button
                    disabled={!codeWasBuilt}
                    href={runLink}
                    startIcon={<SendIcon />}
                  >
                    Ejecutar
                  </Button>
                  <Button
                    href="uniwebview://arpb2?action=move_forward&amp;action=rotate_left&amp;action=move_forward"
                  >
                    Mock
                  </Button>
                </ButtonGroup>
              )
              }
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <SyntaxHighlighter
            language={values.language.toLowerCase()}
            style={darcula}
            showLineNumbers
            id="code"
            className="step-two"
          >
            {values.currentCode}
          </SyntaxHighlighter>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            className="step-five"
            style={{ float: 'right' }}
            href={`uniwebview://arpb2/level?next=${parseInt(id, 10) + 1}`}
            onClick={handleNextLevel()}
          >
            Siguiente Nivel
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default MyBlockly;
