import fs from 'fs';
import parseXML from './parser';

test('parse custom lib', () => {
  const xml = fs.readFileSync('./src/server/parser/golden/1.xml').toString();

  expect(parseXML(xml)).toStrictEqual(JSON.parse(`{"code":[{"block":[{"attr":{"@_type":"controls_if"},"value":[{"attr":{"@_name":"IF0"},"block":[{"attr":{"@_type":"logic_boolean"},"field":[{"#text":"TRUE","attr":{"@_name":"BOOL"}}]
}]}],"statement":[{"attr":{"@_name":"DO0"},"block":[{"attr":{"@_type":"jump_arpb2"}}]}]}]}]}`));
});

test('parse while loop with action', () => {
  const xml = fs.readFileSync('./src/server/parser/golden/2.xml').toString();
  const parsed = parseXML(xml);

  expect(parsed).toStrictEqual(JSON.parse('{"code":[{"block":[{"attr":{"@_type":"controls_whileUntil"},"field":[{"#text":"WHILE","attr":{"@_name":"MODE"}}],"value":[{"attr":{"@_name":"BOOL"},"block":[{"attr":{"@_type":"logic_boolean"},"field":[{"#text":"TRUE","attr":{"@_name":"BOOL"}}]}]}],"statement":[{"attr":{"@_name":"DO"},"block":[{"attr":{"@_type":"pickup_arpb2"}}]}]}]}]}'));
});

test('parse while with condition and multiple actions', () => {
  const xml = fs.readFileSync('./src/server/parser/golden/3.xml').toString();
  const parsed = parseXML(xml);

  expect(parsed).toStrictEqual(JSON.parse('{"code":[{"block":[{"attr":{"@_type":"controls_whileUntil"},"field":[{"#text":"WHILE","attr":{"@_name":"MODE"}}],"value":[{"attr":{"@_name":"BOOL"},"block":[{"attr":{"@_type":"logic_operation"},"field":[{"#text":"AND","attr":{"@_name":"OP"}}],"value":[{"attr":{"@_name":"A"},"block":[{"attr":{"@_type":"logic_boolean"},"field":[{"#text":"TRUE","attr":{"@_name":"BOOL"}}]}]},{"attr":{"@_name":"B"},"block":[{"attr":{"@_type":"logic_negate"},"value":[{"attr":{"@_name":"BOOL"},"block":[{"attr":{"@_type":"logic_boolean"},"field":[{"#text":"FALSE","attr":{"@_name":"BOOL"}}]}]}]}]}]}]}],"statement":[{"attr":{"@_name":"DO"},"block":[{"attr":{"@_type":"rotate_arpb2"},"field":[{"#text":"rotate_left","attr":{"@_name":"direction"}}],"next":[{"block":[{"attr":{"@_type":"move_forward_arpb2"},"next":[{"block":[{"attr":{"@_type":"jump_arpb2"}}]}]}]}]}]}]}]}]}'));
});
