import parser from 'fast-xml-parser';

const parseXML = xmlData => parser.parse(xmlData, []);

module.exports = parseXML;
