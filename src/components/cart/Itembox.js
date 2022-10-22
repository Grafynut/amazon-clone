import React, { useEffect, useRef, useState } from 'react'
import { useStateValue } from '../StateProvider'
import { StarBorderSharp, Star } from '@mui/icons-material';

function Itembox({ item, index }) {
    const [{ }, dispatch] = useStateValue();
    const itemDiv = useRef();

    const removeFromCart = (id) => {
        const current = itemDiv.current;
        current.style.transition = '0.3s';
        current.classList.add('remove');

        setTimeout(() => {
            current.style.transition = '0s';
            current.classList.remove('remove');
            dispatch({
                type: "ROMOVE_FROM_BASKET",
                id: id
            })
        }, 400);
    }


    return (
        <div className={'cart_item_box'} ref={itemDiv}>
            <div className='left'>
                <img src={item.image} alt="product" />
            </div>
            <div className='right'>
                <h2 className='heading'>{item.title}</h2>
                <div className='rating'>
                    {item.ratingStar?.map((_, i) => {
                        return item.rating[0].rating - 1 >= i ? <Star style={{ color: "#ffa41c" }} key={i} /> : <StarBorderSharp style={{ color: "#ffa41c" }} key={i} />
                    })}
                    {item.rating.length}
                </div>
                <div className='price_section'>
                    <span>₹</span>{item.offer}.00<br></br>
                    <span>₹{item.price}.00</span>
                </div>
                <div className='quantity'>
                    <div className='selected_number'><span>Quantity:</span> {item.numOfitem}</div>
                    <div className='total_price'><span>Total Price:</span> ₹{item.offer * item.numOfitem}.00</div>
                </div>
                <button className='remove_item' onClick={(e) => {
                    e.preventDefault();
                    removeFromCart(item.id)
                }}>Remove from cart</button>
            </div>
        </div>
    )
}

export default Itembox