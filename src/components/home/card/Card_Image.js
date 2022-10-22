import React from 'react';
import offerPrice from '../../offerpriceCalculator';

function CardImage({ image, details, offers, price }) {

    return (
        <div className='Card_Image'>
            <div className='card_image_box'>
                <img src={image} alt='card' className='card_image' />
            </div>
            {details ? <p className='details'>{offers ? <span>{`Up to ${offers}`}</span> : null}{details}</p> : null}
            {price ?
                <div className='price_and_discount'>
                    <h5 className='discount_price'><span>₹</span>{offers && price ? offerPrice(price, offers) + '.00' : null}</h5>
                    <h6 className='actual_price'>M.R.P.: <span>₹{price}.00</span></h6>
                </div>
                : null
            }
        </div>
    )
}

export default CardImage;