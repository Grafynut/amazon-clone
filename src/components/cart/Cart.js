import React, { useState } from 'react'
import { useStateValue } from '../StateProvider'
import './cart.css'
import Itembox from './Itembox';
import { Link } from 'react-router-dom';

function Cart() {
    const [{ basket, user }, dispatch] = useStateValue();

    let price = [];
    let TotalValue = 0;
    const TotalPrice = (num, quen) => {
        price.push(Number(num * quen));
        TotalValue = price.reduce((elem1, elem2) => {
            return elem1 + elem2;
        }, 0)
    }


    return (
        <div className='cart_item'>
            {basket.length < 1 ? <Link to={'/'}><div className='card_product_noty'>View Products</div></Link> : null}
            {basket.length > 0 && <>
                <div className='product'>
                    {basket?.map((item, i) => {
                        TotalPrice(item.offer, item.numOfitem)
                        return <Itembox item={item} key={i} index={i} />
                    })}
                </div>
                <div className='Item_total'>
                    <h3 className='total_price'>Subtotal ({basket.length} item): <span>₹</span>{TotalValue}.00</h3>
                    <Link to={user ? basket.length > 0 ? '/payment' : '/' : '/login'}>
                        <button className='proceed_next_btn' >Proceed To Buy</button>
                    </Link>
                </div>
            </>}
        </div>
    )
}

export default Cart