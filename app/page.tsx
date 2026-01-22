import React from 'react'
import Card from '../src/components/Card'

const Home = () => {
  // Placeholder data for latest shoes
  const latestShoes = [
    {
      id: '1',
      title: 'Air Jordan 1 Retro High OG',
      description: 'The legendary silhouette that started it all. Premium leather construction with iconic Wings logo.',
      price: 170,
      originalPrice: 200,
      isOnSale: true,
      image: '/shoes/shoe-1.jpg',
      link: '/products/air-jordan-1',
      brand: 'Jordan',
      rating: 4.8,
      isNew: false,
      category: "Men's Shoes",
      colors: 4,
      sizes: "7-15"
    },
    {
      id: '2',
      title: 'Nike Air Max 270',
      description: 'Maximum cushioning meets modern style. Visible Air unit for all-day comfort.',
      price: 150,
      image: '/shoes/shoe-2.webp',
      link: '/products/air-max-270',
      brand: 'Nike',
      rating: 4.6,
      isNew: true,
      category: "Men's Shoes",
      colors: 6,
      sizes: "6-15"
    },
    {
      id: '3',
      title: 'Nike Dunk Low',
      description: 'Timeless basketball style meets street fashion. Premium suede and leather upper.',
      price: 100,
      image: '/shoes/shoe-3.webp',
      link: '/products/dunk-low',
      brand: 'Nike',
      rating: 4.7,
      isNew: false,
      category: "Men's Shoes",
      colors: 8,
      sizes: "6-15"
    },
    {
      id: '4',
      title: 'Nike React Element 55',
      description: 'Retro running inspiration with modern React technology. Breathable mesh upper.',
      price: 130,
      originalPrice: 160,
      isOnSale: true,
      image: '/shoes/shoe-4.webp',
      link: '/products/react-element-55',
      brand: 'Nike',
      rating: 4.5,
      isNew: false,
      category: "Women's Shoes",
      colors: 3,
      sizes: "5-12"
    },
    {
      id: '5',
      title: 'Nike Air Force 1 \'07',
      description: 'The radiance lives on. Classic basketball style with durable leather construction.',
      price: 110,
      image: '/shoes/shoe-5.avif',
      link: '/products/air-force-1',
      brand: 'Nike',
      rating: 4.9,
      isNew: false,
      category: "Men's Shoes",
      colors: 12,
      sizes: "6-15"
    },
    {
      id: '6',
      title: 'Nike Blazer Mid \'77',
      description: 'Praised by the streets and styled for the people. Heritage basketball inspiration.',
      price: 90,
      image: '/shoes/shoe-6.avif',
      link: '/products/blazer-mid',
      brand: 'Nike',
      rating: 4.4,
      isNew: true,
      category: "Kids' Shoes",
      colors: 5,
      sizes: "1-7"
    }
  ]

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className='text-heading-1 font-jost text-center py-12'>Nike</h1>

        {/* Latest Shoes Section */}
        <section className="py-16">
          <h2 className="text-[var(--text-heading-2)] font-[var(--text-heading-2--font-weight)] text-[var(--color-dark-900)] text-center mb-12">
            Latest Shoes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestShoes.map((shoe) => (
              <Card
                key={shoe.id}
                title={shoe.title}
                image={shoe.image}
                price={shoe.price}
                originalPrice={shoe.originalPrice}
                isOnSale={shoe.isOnSale}
                link={shoe.link}
                brand={shoe.brand}
                rating={shoe.rating}
                isNew={shoe.isNew}
                category={shoe.category}
                colors={shoe.colors}
                sizes={shoe.sizes}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home