import Blockly from 'blockly';

const INITIAL_XML = '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';

const ConfigFiles = {
  INITIAL_XML,
};

export default ConfigFiles;

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

Blockly.Blocks.jump_arpb2 = {
  init() {
    this.appendDummyInput().appendField('jump');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Make ARPB2 jump in the current direction');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.pickup_arpb2 = {
  init() {
    this.appendDummyInput().appendField('pick up');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Pick up an object');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.save_in_bag_arpb2 = {
  init() {
    this.appendDummyInput().appendField('save in bag');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Save current object in the bag');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.use_object_arpb2 = {
  init() {
    this.appendDummyInput().appendField('use object');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(0);
    this.setTooltip('Use current object');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `(direction) => { ACTION_ROTATE_${dropdownDirection.toUpperCase()}; }`;
  return code;
};

Blockly.JavaScript.move_forward_arpb2 = (block) => {
  const code = '() => { ACTION_MOVE_FORWARD; }';
  return code;
};

Blockly.JavaScript.jump_arpb2 = (block) => {
  // TODO: Assemble JavaScript into code variable.
  const code = '...;\n';
  return code;
};

Blockly.JavaScript.pickup_arpb2 = (block) => {
  // TODO: Assemble JavaScript into code variable.
  const code = '...;\n';
  return code;
};

Blockly.JavaScript.save_in_bag_arpb2 = (block) => {
  // TODO: Assemble JavaScript into code variable.
  const code = '...;\n';
  return code;
};

Blockly.JavaScript.use_object_arpb2 = (block) => {
  // TODO: Assemble JavaScript into code variable.
  const code = '...;\n';
  return code;
};

Blockly.Python.rotate_arpb2 = (block) => {
  const dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble Python into code variable.
  const code = '...\n';
  return code;
};

Blockly.Python.move_forward_arpb2 = (block) => {
  // TODO: Assemble Python into code variable.
  const code = '...\n';
  return code;
};

Blockly.Python.jump_arpb2 = (block) => {
  // TODO: Assemble Python into code variable.
  const code = '...\n';
  return code;
};

Blockly.Python.pickup_arpb2 = (block) => {
  // TODO: Assemble Python into code variable.
  const code = '...\n';
  return code;
};

Blockly.Python.save_in_bag_arpb2 = (block) => {
  // TODO: Assemble Python into code variable.
  const code = '...\n';
  return code;
};

Blockly.Python.use_object_arpb2 = (block) => {
  // TODO: Assemble Python into code variable.
  const code = '...\n';
  return code;
};

Blockly.PHP.rotate_arpb2 = (block) => {
  const dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble PHP into code variable.
  const code = '...;\n';
  return code;
};

Blockly.PHP.move_forward_arpb2 = (block) => {
  // TODO: Assemble PHP into code variable.
  const code = '...;\n';
  return code;
};

Blockly.PHP.jump_arpb2 = (block) => {
  // TODO: Assemble PHP into code variable.
  const code = '...;\n';
  return code;
};

Blockly.PHP.pickup_arpb2 = (block) => {
  // TODO: Assemble PHP into code variable.
  const code = '...;\n';
  return code;
};

Blockly.PHP.save_in_bag_arpb2 = (block) => {
  // TODO: Assemble PHP into code variable.
  const code = '...;\n';
  return code;
};

Blockly.PHP.use_object_arpb2 = (block) => {
  // TODO: Assemble PHP into code variable.
  const code = '...;\n';
  return code;
};

Blockly.Lua.rotate_arpb2 = (block) => {
  const dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble Lua into code variable.
  const code = '...\n';
  return code;
};

Blockly.Lua.move_forward_arpb2 = (block) => {
  // TODO: Assemble Lua into code variable.
  const code = '...\n';
  return code;
};

Blockly.Lua.jump_arpb2 = (block) => {
  // TODO: Assemble Lua into code variable.
  const code = '...\n';
  return code;
};

Blockly.Lua.pickup_arpb2 = (block) => {
  // TODO: Assemble Lua into code variable.
  const code = '...\n';
  return code;
};

Blockly.Lua.save_in_bag_arpb2 = (block) => {
  // TODO: Assemble Lua into code variable.
  const code = '...\n';
  return code;
};

Blockly.Lua.use_object_arpb2 = (block) => {
  // TODO: Assemble Lua into code variable.
  const code = '...\n';
  return code;
};

Blockly.Dart.rotate_arpb2 = (block) => {
  const dropdown_direction = block.getFieldValue('direction');
  // TODO: Assemble Dart into code variable.
  const code = '...;\n';
  return code;
};

Blockly.Dart.move_forward_arpb2 = (block) => {
  // TODO: Assemble Dart into code variable.
  const code = '...;\n';
  return code;
};

Blockly.Dart.jump_arpb2 = (block) => {
  // TODO: Assemble Dart into code variable.
  const code = '...;\n';
  return code;
};

Blockly.Dart.pickup_arpb2 = (block) => {
  // TODO: Assemble Dart into code variable.
  const code = '...;\n';
  return code;
};

Blockly.Dart.save_in_bag_arpb2 = (block) => {
  // TODO: Assemble Dart into code variable.
  const code = '...;\n';
  return code;
};

Blockly.Dart.use_object_arpb2 = (block) => {
  // TODO: Assemble Dart into code variable.
  const code = '...;\n';
  return code;
};
