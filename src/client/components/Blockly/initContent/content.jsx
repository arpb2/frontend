import Blockly from 'blockly';

const INITIAL_XML = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

const ConfigFiles = {
  INITIAL_XML,
};

Blockly.Blocks.rotate_arpb2 = {
  init() {
    this.appendDummyInput()
      .appendField('rotate')
      .appendField(new Blockly.FieldDropdown([['left', 'rotate_left'], ['right', 'rotate_right']]), 'direction');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Rotate ARPB2 in the selected direction');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.rotate_arpb2 = (block) => {
  const dropdown_direction = block.getFieldValue('direction');
  const code = `(direction) => { ACTION_ROTATE_${dropdown_direction.toUpperCase()}; }`;
  return code;
};

Blockly.Blocks.move_forward_arpb2 = {
  init() {
    this.appendDummyInput().appendField('move forward');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Move ARPB2 in the current direction');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.move_forward_arpb2 = (block) => {
  const code = '() => { ACTION_MOVE_FORWARD; }';
  return code;
};

export default ConfigFiles;
