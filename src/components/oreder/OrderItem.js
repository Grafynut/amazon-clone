import React from 'react';
import { StarBorderSharp, Star } from '@mui/icons-material';



function OrderItem({ item }) {

    return (
        <>
            <div className='orderItem'>
                <div className='left'>
                    <img src={item.image} alt={`orderProduct`} />
                </div>
                <div className='right'>
                    <h1 className='item_heading'>{item.title}</h1>
                    <div className='rating'>
                        {item.ratingStar?.map((_, i) => {
                            return item.rating[0].rating - 1 >= i ? <Star style={{ color: "#ffa41c" }} /> : <StarBorderSharp style={{ color: "#ffa41c" }} />
                        })}
                        {item.rating.length}
                    </div>
                    <h3 className='order_price'><span></span>₹{item.offer}.00</h3>
                </div>
            </div>
        </>
    )
}

export default OrderItem