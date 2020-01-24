const INITIAL_XML = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

const INITIAL_TOOLBOX_CATEGORIES = [
  {
    name: 'Controls',
    blocks: [
      { type: 'controls_if' },
      {
        type: 'controls_repeat_ext',
        values: {
          TIMES: {
            type: 'math_number',
            shadow: true,
            fields: {
              NUM: 10,
            },
          },
        },
        statements: {
          DO: {
            type: 'text_print',
            shadow: true,
            values: {
              TEXT: {
                type: 'text',
                shadow: true,
                fields: {
                  TEXT: 'abc',
                },
              },
            },
          },
        },
      },
    ],
  },
  {
    name: 'Text',
    blocks: [
      { type: 'text' },
      {
        type: 'text_print',
        values: {
          TEXT: {
            type: 'text',
            shadow: true,
            fields: {
              TEXT: 'abc',
            },
          },
        },
      },
    ],
  },
];

const ConfigFiles = {
  INITIAL_XML,
  INITIAL_TOOLBOX_CATEGORIES,
};

export default ConfigFiles;
