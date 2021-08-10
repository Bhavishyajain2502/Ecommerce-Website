import React, {useContext} from 'react';
import { CartContext } from '../Global/CartContext';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Cart = (props) => {
    const {shoppingCart, totalPrice, qty, dispatch}  = useContext(CartContext);
    const handleToken = async (token) => {
        const product = {name: 'All Products', price: totalPrice}
        const response = await axios.post("http://localhost:8080/checkout", {
            product,
            token
        })
        const {status} = response.data;
        if(status === "success"){
            dispatch({type: 'EMPTY'});
            props.history.push('/');
            toast.success("Your have paid successfully", {position: toast.POSITION.TOP_RIGHT});
        }
    }
    return(
        <div className="cart-container">
            <div className="cart-details" style = {{ marginTop: '100px'}} >
            {shoppingCart.length > 0 ? 
              shoppingCart.map(cart => (
                  <div className="cart" key={cart.id}>
                      <span className="cart-image"><img src={cart.image} alt="Not Found" /></span>
                      <span className="cart-product-name">{cart.name}</span>
                      <span className="cart-product-price">Rs.{cart.price}.00</span>
                      <span className="inc" onClick={() => dispatch({type: 'INC', id: cart.id, cart})}><i className="fas fa-plus"></i></span>
                      <span className="product-quantity">{cart.qty}</span>
                      <span className="dec" onClick={() => dispatch({type: 'DEC', id: cart.id, cart})}><i className="fas fa-minus"></i></span>
                      <span className="product-total-price">Rs.{cart.price * cart.qty}.00</span>
                      <span className="delete-product" onClick={() => dispatch({type: 'DELETE', id: cart.id, cart})}><i className="fas fa-trash"></i></span>
                  </div>
              ))
            : <div className="empty">Sorry your cart is empty</div> }
            </div>
            {shoppingCart.length > 0 ? <div className="cart-summary">
                <div className="summary">
                    <h3>Cart Summary</h3>
                    <div className="total-items">
                        <div className="items">Total Items</div>
                        <div className="item-count">{qty}</div>
                    </div>
                    <div className="total-price-section">
                        <div className="just-title">Total Price</div>
                        <div className="item-price">Rs.{totalPrice}.00</div>
                        </div>
                        <div className="stripe-section">
                            <StripeCheckout stripeKey="pk_test_51JMnCISE89oPO9BfoccGregXWjPyD5iVWfvR1u1RxwDiR7hHB7Y8YymBkWHrqVP7DcnHceJ7Qdtyafjwy0FuKYcY001EdeFh17"
                            token = {handleToken}
                            billingAddress
                            shippingAddress
                            amount={totalPrice}
                            name = "All Products"
                            >

                            </StripeCheckout>
                        </div>
                    </div>
            </div>: '' }
        </div>
    )
}

export default Cart;