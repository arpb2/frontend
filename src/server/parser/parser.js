import parser from 'fast-xml-parser';
import he from 'he';

const options = {
  attributeNamePrefix: '@_',
  attrNodeName: 'attr', // default is 'false'
  textNodeName: '#text',
  ignoreAttributes: false,
  ignoreNameSpace: true,
  allowBooleanAttributes: true,
  parseNodeValue: true,
  parseAttributeValue: true,
  trimValues: true,
  cdataTagName: '__cdata', // default is 'false'
  cdataPositionChar: '\\c',
  parseTrueNumberOnly: true,
  arrayMode: true, // "strict"
  attrValueProcessor: (val, attrName) => he.decode(val, { isAttributeValue: true }), // default is a=>a
  tagValueProcessor: (val, tagName) => he.decode(val), // default is a=>a
};

const remove = (data, keys) => {
  const parsed = data;
  Object.keys(data).forEach((key) => {
    if (keys.includes(key)) delete parsed[key];
    else if (typeof data[key] === 'object') remove(parsed[key], keys);
  });
  return parsed;
};

const renameProp = (oldProp, newProp, { [oldProp]: old, ...others }) => ({
  [newProp]: old,
  ...others,
});

const parseXML = (xmlData) => {
  const xml = parser.parse(xmlData, options);
  let parsed = remove(xml, ['@_id', '@_x', '@_y']);
  parsed = renameProp('xml', 'code', parsed);
  return parsed;
};

module.exports = parseXML;
