import { db } from '../src/db';
import { products } from '../src/db/schema';

type Product = typeof products.$inferSelect;

export default async function Home() {
  let productList: Product[] = [];
  try {
    productList = await db.select().from(products);
  } catch (error) {
    console.error('Failed to fetch products:', error);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-10">Nike Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productList.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              {product.image && (
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded-md mb-4" />
              )}
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-green-600">${parseFloat(product.price).toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
