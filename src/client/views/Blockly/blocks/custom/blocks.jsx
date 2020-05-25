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

Blockly.Blocks.open_bag_arpb2 = {
  init() {
    this.appendDummyInput().appendField('open bag');
    this.setPreviousStatement(true, null);
    this.setColour(0);
    this.setTooltip('Open bag');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `url.searchParams.append('action', '${dropdownDirection.toLowerCase()}')\n`;
  return code;
};

Blockly.JavaScript.move_forward_arpb2 = (block) => {
  const code = "url.searchParams.append('action', 'move_forward')\n";
  return code;
};

Blockly.JavaScript.jump_arpb2 = (block) => {
  const code = "url.searchParams.append('action', 'jump')\n";
  return code;
};

Blockly.JavaScript.pickup_arpb2 = (block) => {
  const code = "url.searchParams.append('action', 'pickup')\n";
  return code;
};

Blockly.JavaScript.save_in_bag_arpb2 = (block) => {
  const code = "url.searchParams.append('action', 'save_in_bag')\n";
  return code;
};

Blockly.JavaScript.use_object_arpb2 = (block) => {
  const code = "url.searchParams.append('action', 'use_object')\n";
  return code;
};

Blockly.JavaScript.open_bag_arpb2 = (block) => {
  const code = "url.searchParams.append('action', 'open_bag')\n";
  return code;
};

Blockly.Python.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `req.prepare_url(url, {'action, '${dropdownDirection.toLowerCase()}'})\n`;
  return code;
};

Blockly.Python.move_forward_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action, 'move_forward'})\n";
  return code;
};

Blockly.Python.jump_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action, 'jump'})\n";
  return code;
};

Blockly.Python.pickup_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action, 'pickup'})\n";
  return code;
};

Blockly.Python.save_in_bag_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action, 'save_in_bag'})\n";
  return code;
};

Blockly.Python.use_object_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action, 'use_object'})\n";
  return code;
};

Blockly.Python.open_bag_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action, 'open_bag'})\n";
  return code;
};

Blockly.PHP.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `function rotate_arpb2() {\n  return ACTION_ROTATE_${dropdownDirection};\n}\n`;
  return code;
};

Blockly.PHP.move_forward_arpb2 = (block) => {
  const code = 'function move_forward_arpb2() {\n  return ACTION_ROTATE_MOVE_FORWARD;\n}\n';
  return code;
};

Blockly.PHP.jump_arpb2 = (block) => {
  const code = 'function jump_arpb2() {\n  return ACTION_JUMP;\n}\n';
  return code;
};

Blockly.PHP.pickup_arpb2 = (block) => {
  const code = 'function pickup_arpb2() {\n  return ACTION_PICKUP;\n}\n';
  return code;
};

Blockly.PHP.save_in_bag_arpb2 = (block) => {
  const code = 'function save_in_bag_arpb2() {\n  return ACTION_SAVE_IN_BAG;\n}\n';
  return code;
};

Blockly.PHP.use_object_arpb2 = (block) => {
  const code = 'function use_object_arpb2() {\n  return ACTION_USE_OBJECT;\n}\n';
  return code;
};

Blockly.PHP.open_bag_arpb2 = (block) => {
  const code = 'function open_bag_arpb2() {\n  return ACTION_OPEN_BAG;\n}\n';
  return code;
};

Blockly.Lua.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `function rotate_arpb2()\n  return ACTION_ROTATE_${dropdownDirection}\nend\n`;
  return code;
};

Blockly.Lua.move_forward_arpb2 = (block) => {
  const code = 'function move_forward_arpb2()\n  return ACTION_ROTATE_MOVE_FORWARD\nend\n';
  return code;
};

Blockly.Lua.jump_arpb2 = (block) => {
  const code = 'function jump_arpb2()\n  return ACTION_JUMP\nend\n';
  return code;
};

Blockly.Lua.pickup_arpb2 = (block) => {
  const code = 'function pickup_arpb2()\n  return ACTION_PICKUP\nend\n';
  return code;
};

Blockly.Lua.save_in_bag_arpb2 = (block) => {
  const code = 'function save_in_bag_arpb2()\n  return ACTION_SAVE_IN_BAG\nend\n';
  return code;
};

Blockly.Lua.use_object_arpb2 = (block) => {
  const code = 'function use_object_arpb2()\n  return ACTION_USE_OBJECT\nend\n';
  return code;
};

Blockly.Lua.open_bag_arpb2 = (block) => {
  const code = 'function open_bag_arpb2()\n  return ACTION_OPEN_BAG\nend\n';
  return code;
};

Blockly.Dart.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `dynamic rotate_arpb2() {\n  return ACTION_ROTATE_${dropdownDirection};\n}\n`;
  return code;
};

Blockly.Dart.move_forward_arpb2 = (block) => {
  const code = 'dynamic move_forward_arpb2() {\n  return ACTION_MOVE_FORWARD;\n}\n';
  return code;
};

Blockly.Dart.jump_arpb2 = (block) => {
  const code = 'dynamic jump_arpb2() {\n  return ACTION_JUMP;\n}\n';
  return code;
};

Blockly.Dart.pickup_arpb2 = (block) => {
  const code = 'dynamic pickup_arpb2() {\n  return ACTION_PICKUP;\n}\n';
  return code;
};

Blockly.Dart.save_in_bag_arpb2 = (block) => {
  const code = 'dynamic save_in_bag_arpb2() {\n  return ACTION_SAVE_IN_BAG;\n}\n';
  return code;
};

Blockly.Dart.use_object_arpb2 = (block) => {
  const code = 'dynamic use_object_arpb2() {\n  return ACTION_USE_OBJECT;\n}\n';
  return code;
};

Blockly.Dart.open_bag_arpb2 = (block) => {
  const code = 'dynamic open_bag_arpb2() {\n  return ACTION_OPEN_BAG;\n}\n';
  return code;
};
