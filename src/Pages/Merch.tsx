// src/Pages/Merch.tsx
import React, { useState } from 'react';
import ProductCard from '../components/ProductCard';
import Cart from '../components/Cart';

interface Product {
    id: number;
    name: string;
    price: number;
    sizes: string[];
    image: string;
}

const products: Product[] = [
    {
        id: 1,
        name: "Troncos FC Cap",
        price: 20,
        sizes: ["One Size"],
        image: "https://store.fcbarcelona.com/cdn/shop/files/BLMP000841018_1.jpg?v=1725977541",
    },
    {
        id: 2,
        name: "Troncos FC T-Shirt Kit",
        price: 50,
        sizes: ["XS", "S", "M", "L", "XL"],
        image: "https://img.vsco.co/cdn-cgi/image/width=640,height=800/a520fd/172811525/673d745c29274adbc5c375a2/kit.png",
    },
];

const Merch: React.FC = () => {
    const [cart, setCart] = useState<{ product: Product; size: string; quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product: Product, size: string, quantity: number) => {
        const existingItemIndex = cart.findIndex(
            (item) => item.product.id === product.id && item.size === size
        );

        if (existingItemIndex >= 0) {
            const newCart = [...cart];
            newCart[existingItemIndex].quantity += quantity;
            setCart(newCart);
        } else {
            setCart([...cart, { product, size, quantity }]);
        }
    };

    return (
        <div className="min-h-screen py-10 flex flex-col items-center bg-gradient-to-b from-gray-900 via-black to-gray-900">
            <div className="p-8 rounded-xl w-11/12 max-w-screen-lg bg-gray-800 shadow-2xl relative">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-5xl font-bold text-white tracking-wide">Merch Store</h1>
                    <button
                        className="bg-black text-white px-4 py-2 rounded-full border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                        onClick={() => setIsCartOpen(true)}
                    >
                        🛒
                    </button>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </div>
            </div>

            {/* Cart Modal */}
            {isCartOpen && <Cart cartItems={cart} onClose={() => setIsCartOpen(false)} />}

            {/* Footer Section */}
            <footer className="w-full mt-10 p-8 bg-gray-900 text-white text-center">
                <p className="text-lg italic mb-4">"Wearing our merch isn't just style, it's a lifestyle. Only for true pros." - Troncos FC</p>
                <p className="text-lg italic mb-4">"Real champions train hard, and they look good doing it." - A Troncos FC Player</p>
                <p className="text-lg font-bold">NO RETURNS ACCEPTED</p>
            </footer>
        </div>
    );
};

export default Merch;
