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
    this.setColour(0);
    this.setTooltip('Rotate ARPB2 in the selected direction');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.rotate_arpb2 = (block) => {
  const dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble JavaScript into code variable.
  const code = '';
  return code;
};

export default ConfigFiles;
