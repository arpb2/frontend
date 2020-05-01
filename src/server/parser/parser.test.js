import fs from 'fs';
import parseXML from './parser';

test('parse custom lib', () => {
  const xml = fs.readFileSync('blockly_custom_library.xml').toString();
  // expect(parseXML(xml)).toBe(3);
  console.log(JSON.stringify(parseXML(xml)));
});
