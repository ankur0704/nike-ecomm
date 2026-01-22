import { db } from '../src/db';
import { products } from '../src/db/schema';

async function seed() {
  await db.insert(products).values([
    {
      name: 'Nike Air Max 270',
      price: '150.00',
      description: 'The Nike Air Max 270 delivers incredible all-day comfort.',
      image: 'https://example.com/airmax270.jpg',
    },
    {
      name: 'Nike React Element 55',
      price: '130.00',
      description: 'The Nike React Element 55 is a comfortable and stylish sneaker.',
      image: 'https://example.com/reactelement55.jpg',
    },
    {
      name: 'Nike Air Force 1',
      price: '110.00',
      description: 'The Nike Air Force 1 is a classic basketball shoe.',
      image: 'https://example.com/airforce1.jpg',
    },
  ]);
  console.log('Seeded products');
}

seed().catch(console.error);