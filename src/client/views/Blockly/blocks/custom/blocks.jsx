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
  const code = `req.prepare_url(url, {'action', '${dropdownDirection.toLowerCase()}'})\n`;
  return code;
};

Blockly.Python.move_forward_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action', 'move_forward'})\n";
  return code;
};

Blockly.Python.jump_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action', 'jump'})\n";
  return code;
};

Blockly.Python.pickup_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action', 'pickup'})\n";
  return code;
};

Blockly.Python.save_in_bag_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action', 'save_in_bag'})\n";
  return code;
};

Blockly.Python.use_object_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action', 'use_object'})\n";
  return code;
};

Blockly.Python.open_bag_arpb2 = (block) => {
  const code = "req.prepare_url(url, {'action', 'open_bag'})\n";
  return code;
};

Blockly.PHP.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `$url .= http_build_query(array('action' => '${dropdownDirection.toLowerCase()}'))\n`;
  return code;
};

Blockly.PHP.move_forward_arpb2 = (block) => {
  const code = '$url .= http_build_query(array(\'action\' => \'move_forward\'))\n';
  return code;
};

Blockly.PHP.jump_arpb2 = (block) => {
  const code = '$url .= http_build_query(array(\'action\' => \'jump\'))\n';
  return code;
};

Blockly.PHP.pickup_arpb2 = (block) => {
  const code = '$url .= http_build_query(array(\'action\' => \'pickup\'))\n';
  return code;
};

Blockly.PHP.save_in_bag_arpb2 = (block) => {
  const code = '$url .= http_build_query(array(\'action\' => \'save_in_bag\'))\n';
  return code;
};

Blockly.PHP.use_object_arpb2 = (block) => {
  const code = '$url .= http_build_query(array(\'action\' => \'use_object\'))';
  return code;
};

Blockly.PHP.open_bag_arpb2 = (block) => {
  const code = '$url .= http_build_query(array(\'action\' => \'open_bag\'))';
  return code;
};

Blockly.Lua.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `url:setQuery{ action = "${dropdownDirection.toLowerCase()}" }\n`;
  return code;
};

Blockly.Lua.move_forward_arpb2 = (block) => {
  const code = 'url:setQuery{ action = "move_forward" }\n';
  return code;
};

Blockly.Lua.jump_arpb2 = (block) => {
  const code = 'url:setQuery{ action = "jump" }\n';
  return code;
};

Blockly.Lua.pickup_arpb2 = (block) => {
  const code = 'url:setQuery{ action = "pickup" }\n';
  return code;
};

Blockly.Lua.save_in_bag_arpb2 = (block) => {
  const code = 'url:setQuery{ action = "save_in_bag" }\n';
  return code;
};

Blockly.Lua.use_object_arpb2 = (block) => {
  const code = 'url:setQuery{ action = "use_object" }\n';
  return code;
};

Blockly.Lua.open_bag_arpb2 = (block) => {
  const code = 'url:setQuery{ action = "open_bag" }\n';
  return code;
};

Blockly.Dart.rotate_arpb2 = (block) => {
  const dropdownDirection = block.getFieldValue('direction');
  const code = `uri = Uri.https(uri, '', {'action': '${dropdownDirection.toLowerCase()}'});\n`;
  return code;
};

Blockly.Dart.move_forward_arpb2 = (block) => {
  const code = 'uri = Uri.https(uri, \'\', {\'action\': \'move_forward\'});\n';
  return code;
};

Blockly.Dart.jump_arpb2 = (block) => {
  const code = 'uri = Uri.https(uri, \'\', {\'action\': \'jump\'});\n';
  return code;
};

Blockly.Dart.pickup_arpb2 = (block) => {
  const code = 'uri = Uri.https(uri, \'\', {\'action\': \'pickup\'});\n';
  return code;
};

Blockly.Dart.save_in_bag_arpb2 = (block) => {
  const code = 'uri = Uri.https(uri, \'\', {\'action\': \'save_in_bag\'});\n';
  return code;
};

Blockly.Dart.use_object_arpb2 = (block) => {
  const code = 'uri = Uri.https(uri, \'\', {\'action\': \'use_object\'});\n';
  return code;
};

Blockly.Dart.open_bag_arpb2 = (block) => {
  const code = 'uri = Uri.https(uri, \'\', {\'action\': \'open_bag\'});\n';
  return code;
};

Blockly.Blocks.dict_empty = {
  init() {
    this.appendDummyInput()
      .appendField('create empty dictionary');
    this.setOutput(true, 'dict');
    this.setColour(75);
    this.setTooltip('Creates a dictionary');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.dict_get = {
  init() {
    this.appendValueInput('KEY')
      .setCheck('String')
      .appendField(new Blockly.FieldLabelSerializable('get element with key'), 'KEY');
    this.appendValueInput('DICT')
      .setCheck('dict')
      .setAlign(Blockly.ALIGN_RIGHT)
      .appendField(new Blockly.FieldLabelSerializable('from'), 'DICT');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(75);
    this.setTooltip('Returns the value of the key from the dict, null if not present');
    this.setHelpUrl('');
  },
};

Blockly.Blocks.dict_set = {
  init() {
    this.appendValueInput('VALUE')
      .setCheck(null)
      .appendField(new Blockly.FieldLabelSerializable('set value'), 'VALUE');
    this.appendValueInput('KEY')
      .setCheck('String')
      .appendField(new Blockly.FieldLabelSerializable('with key'), 'KEY');
    this.appendValueInput('DICT')
      .setCheck('dict')
      .appendField(new Blockly.FieldLabelSerializable('into'), 'DICT');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(75);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript.dict_empty = (block) => {
  const code = '{}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python.dict_empty = function (block) {
  const code = '{}';
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.PHP.dict_empty = function (block) {
  const code = '[]';
  return [code, Blockly.PHP.ORDER_ATOMIC];
};

Blockly.Lua.dict_empty = function (block) {
  const code = '{}';
  return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Dart.dict_empty = function (block) {
  const code = '{}';
  return [code, Blockly.Dart.ORDER_ATOMIC];
};

Blockly.JavaScript.dict_get = (block) => {
  const value_key = Blockly.JavaScript.valueToCode(block, 'KEY', Blockly.JavaScript.ORDER_ATOMIC);
  const value_dict = Blockly.JavaScript.valueToCode(block, 'DICT', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}]`;
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Python.dict_get = function (block) {
  const value_key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
  const value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}]`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.PHP.dict_get = function (block) {
  const value_key = Blockly.PHP.valueToCode(block, 'KEY', Blockly.PHP.ORDER_ATOMIC);
  const value_dict = Blockly.PHP.valueToCode(block, 'DICT', Blockly.PHP.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}]`;
  return [code, Blockly.PHP.ORDER_ATOMIC];
};

Blockly.Lua.dict_get = function (block) {
  const value_key = Blockly.Lua.valueToCode(block, 'KEY', Blockly.Lua.ORDER_ATOMIC);
  const value_dict = Blockly.Lua.valueToCode(block, 'DICT', Blockly.Lua.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}]`;
  return [code, Blockly.Lua.ORDER_ATOMIC];
};

Blockly.Dart.dict_get = function (block) {
  const value_key = Blockly.Dart.valueToCode(block, 'KEY', Blockly.Dart.ORDER_ATOMIC);
  const value_dict = Blockly.Dart.valueToCode(block, 'DICT', Blockly.Dart.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}]`;
  return [code, Blockly.Dart.ORDER_ATOMIC];
};

Blockly.JavaScript.dict_set = (block) => {
  const value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  const value_key = Blockly.JavaScript.valueToCode(block, 'KEY', Blockly.JavaScript.ORDER_ATOMIC);
  const value_dict = Blockly.JavaScript.valueToCode(block, 'DICT', Blockly.JavaScript.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}] = ${value_value};\n`;
  return code;
};

Blockly.Python.dict_set = function (block) {
  const value_value = Blockly.Python.valueToCode(block, 'VALUE', Blockly.Python.ORDER_ATOMIC);
  const value_key = Blockly.Python.valueToCode(block, 'KEY', Blockly.Python.ORDER_ATOMIC);
  const value_dict = Blockly.Python.valueToCode(block, 'DICT', Blockly.Python.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}] = ${value_value}\n`;
  return code;
};

Blockly.PHP.dict_set = function (block) {
  const value_value = Blockly.PHP.valueToCode(block, 'VALUE', Blockly.PHP.ORDER_ATOMIC);
  const value_key = Blockly.PHP.valueToCode(block, 'KEY', Blockly.PHP.ORDER_ATOMIC);
  const value_dict = Blockly.PHP.valueToCode(block, 'DICT', Blockly.PHP.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}] = ${value_value};\n`;
  return code;
};

Blockly.Lua.dict_set = function (block) {
  const value_value = Blockly.Lua.valueToCode(block, 'VALUE', Blockly.Lua.ORDER_ATOMIC);
  const value_key = Blockly.Lua.valueToCode(block, 'KEY', Blockly.Lua.ORDER_ATOMIC);
  const value_dict = Blockly.Lua.valueToCode(block, 'DICT', Blockly.Lua.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}] = ${value_value};\n`;
  return code;
};

Blockly.Dart.dict_set = function (block) {
  const value_value = Blockly.Dart.valueToCode(block, 'VALUE', Blockly.Dart.ORDER_ATOMIC);
  const value_key = Blockly.Dart.valueToCode(block, 'KEY', Blockly.Dart.ORDER_ATOMIC);
  const value_dict = Blockly.Dart.valueToCode(block, 'DICT', Blockly.Dart.ORDER_ATOMIC);
  const code = `${value_dict}[${value_key}] = ${value_value};\n`;
  return code;
};
