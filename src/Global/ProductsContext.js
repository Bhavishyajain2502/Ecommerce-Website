import React, {createContext, useState} from 'react';
import dslr from '../assets/dslr.jpg';
import headphone from '../assets/headphone.jpg';
import iphone from '../assets/iphone.jpg';
import laptop from '../assets/laptop.jpg';
import microphone from '../assets/microphone.jpg';
import perfume from '../assets/perfume.jpg';
import ring from '../assets/ring.jpg';
import shoes from '../assets/shoes.jpg';

export const ProductsContext = createContext();

const ProductsContextProvider = (props) => {
    const [products] = useState([
        {id: 1,name: 'DSLR', price: 300, image: dslr, status: 'hot'},
        {id: 2,name: 'HEADPHONE', price: 400, image: headphone, status: 'new'},
        {id: 3,name: 'I-PHONE', price: 500, image: iphone, status: 'hot'},
        {id: 4,name: 'LAPTOP', price: 600, image: laptop, status: 'new'},
        {id: 5,name: 'MICROPHONE', price: 700, image: microphone, status: 'hot'},
        {id: 6,name: 'PERFUME', price: 800, image: perfume, status: 'new'},
        {id: 7,name: 'RING', price: 500, image: ring, status: 'hot'},
        {id: 8,name: 'SHOES', price: 800, image: shoes, status: 'new'},
    ]);

    return(
        <ProductsContext.Provider value = {{products: [...products]}}>
        {props.children}
        </ProductsContext.Provider>
    )
}

export default ProductsContextProvider;