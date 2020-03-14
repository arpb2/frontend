import { v1 as uuidv1 } from 'uuid';
import moment from 'moment';

export default [
  {
    id: uuidv1(),
    name: 'Dropbox',
    imageUrl: '/public/images/products/product_1.png',
    updatedAt: moment().subtract(2, 'hours'),
  },
  {
    id: uuidv1(),
    name: 'Medium Corporation',
    imageUrl: '/public/images/products/product_2.png',
    updatedAt: moment().subtract(2, 'hours'),
  },
  {
    id: uuidv1(),
    name: 'Slack',
    imageUrl: '/public/images/products/product_3.png',
    updatedAt: moment().subtract(3, 'hours'),
  },
  {
    id: uuidv1(),
    name: 'Lyft',
    imageUrl: '/public/images/products/product_4.png',
    updatedAt: moment().subtract(5, 'hours'),
  },
  {
    id: uuidv1(),
    name: 'GitHub',
    imageUrl: '/public/images/products/product_5.png',
    updatedAt: moment().subtract(9, 'hours'),
  },
];
