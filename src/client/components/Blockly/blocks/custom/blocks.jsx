import Blockly from 'blockly';

Blockly.Blocks.rotate_arpb2 = {
  init() {
    this.appendDummyInput()
      .appendField('rotate')
      .appendField(
        new Blockly.FieldDropdown([
          ['left', 'rotate_left'],
          ['right', 'rotate_right'],
        ]),
        'direction',
      );
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
  const code = `() => { return ACTION_ROTATE_${dropdownDirection.toUpperCase()}; }`;
  return code;
};

Blockly.JavaScript.move_forward_arpb2 = (block) => {
  const code = '() => { return ACTION_MOVE_FORWARD; }';
  return code;
};

Blockly.JavaScript.jump_arpb2 = (block) => {
  const code = '() => { return ACTION_JUMP; }';
  return code;
};

Blockly.JavaScript.pickup_arpb2 = (block) => {
  const code = '() => { return ACTION_PICKUP; }';
  return code;
};

Blockly.JavaScript.save_in_bag_arpb2 = (block) => {
  const code = '() => { return ACTION_SAVE_IN_BAG; }';
  return code;
};

Blockly.JavaScript.use_object_arpb2 = (block) => {
  const code = '() => { return ACTION_SAVE_IN_BAG; }';
  return code;
};

Blockly.Python.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `def rotate_arpb2():\n  return ACTION_MOVE_${dropdownDirection}`;
  return code;
};

Blockly.Python.move_forward_arpb2 = (block) => {
  const code = 'def move_forward_arpb2():\n  return ACTION_MOVE_FORWARD';
  return code;
};

Blockly.Python.jump_arpb2 = (block) => {
  const code = 'def jump_arpb2():\n  return ACTION_JUMP';
  return code;
};

Blockly.Python.pickup_arpb2 = (block) => {
  const code = 'def pickup_arpb2():\n  return ACTION_PICKUP';
  return code;
};

Blockly.Python.save_in_bag_arpb2 = (block) => {
  const code = 'def save_in_bag_arpb2():\n  return ACTION_SAVE_IN_BAG';
  return code;
};

Blockly.Python.use_object_arpb2 = (block) => {
  const code = 'def use_object_arpb2():\n  return ACTION_USE_OBJECT';
  return code;
};

Blockly.PHP.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `function rotate_arpb2() {\n  return ACTION_ROTATE_${dropdownDirection};\n}`;
  return code;
};

Blockly.PHP.move_forward_arpb2 = (block) => {
  const code = 'function move_forward_arpb2() {\n  return ACTION_ROTATE_MOVE_FORWARD;\n}';
  return code;
};

Blockly.PHP.jump_arpb2 = (block) => {
  const code = 'function jump_arpb2() {\n  return ACTION_JUMP;\n}';
  return code;
};

Blockly.PHP.pickup_arpb2 = (block) => {
  const code = 'function pickup_arpb2() {\n  return ACTION_PICKUP;\n}';
  return code;
};

Blockly.PHP.save_in_bag_arpb2 = (block) => {
  const code = 'function save_in_bag_arpb2() {\n  return ACTION_SAVE_IN_BAG;\n}';
  return code;
};

Blockly.PHP.use_object_arpb2 = (block) => {
  const code = 'function use_object_arpb2() {\n  return ACTION_USE_OBJECT;\n}';
  return code;
};

Blockly.Lua.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `function rotate_arpb2()\n  return ACTION_ROTATE_${dropdownDirection}\nend`;
  return code;
};

Blockly.Lua.move_forward_arpb2 = (block) => {
  const code = 'function move_forward_arpb2()\n  return ACTION_ROTATE_MOVE_FORWARD\nend';
  return code;
};

Blockly.Lua.jump_arpb2 = (block) => {
  const code = 'function jump_arpb2()\n  return ACTION_JUMP\nend';
  return code;
};

Blockly.Lua.pickup_arpb2 = (block) => {
  const code = 'function pickup_arpb2()\n  return ACTION_PICKUP\nend';
  return code;
};

Blockly.Lua.save_in_bag_arpb2 = (block) => {
  const code = 'function save_in_bag_arpb2()\n  return ACTION_SAVE_IN_BAG\nend';
  return code;
};

Blockly.Lua.use_object_arpb2 = (block) => {
  const code = 'function use_object_arpb2()\n  return ACTION_USE_OBJECT\nend';
  return code;
};

Blockly.Dart.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `dynamic rotate_arpb2() {\n  return ACTION_ROTATE_${dropdownDirection};\n}`;
  return code;
};

Blockly.Dart.move_forward_arpb2 = (block) => {
  const code = 'dynamic move_forward_arpb2() {\n  return ACTION_MOVE_FORWARD;\n}';
  return code;
};

Blockly.Dart.jump_arpb2 = (block) => {
  const code = 'dynamic jump_arpb2() {\n  return ACTION_JUMP;\n}';
  return code;
};

Blockly.Dart.pickup_arpb2 = (block) => {
  const code = 'dynamic pickup_arpb2() {\n  return ACTION_PICKUP;\n}';
  return code;
};

Blockly.Dart.save_in_bag_arpb2 = (block) => {
  const code = 'dynamic save_in_bag_arpb2() {\n  return ACTION_SAVE_IN_BAG;\n}';
  return code;
};

Blockly.Dart.use_object_arpb2 = (block) => {
  const code = 'dynamic use_object_arpb2() {\n  return ACTION_USE_OBJECT;\n}';
  return code;
};
