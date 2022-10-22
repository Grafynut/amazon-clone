import React from 'react'
import { StarBorderSharp, Star } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import offerPrice from '../../offerpriceCalculator';

function ProductCard({ item, cet }) {

    //rating
    const rating = [];
    for (let i = 1; i <= 5; i++) {
        rating.push(i);
    }

    return (
        <Link to={`/${cet}/productdetails?cet=${cet}&id=${item.id}`} className='product_link'>
            <div className='cardDetails'>
                <div className='image_section'>
                    <img src={item.image[0].url} alt='product' />
                </div>
                <div className='details'>
                    <h2 className='brandName'>{item.brand}</h2>
                    <h4 className='product_details'>{item.title}</h4>
                    <div className='rating'>
                        {rating?.map((_, i) => {
                            return item.review[0].rating - 1 >= i ? <Star style={{ color: "#ffa41c" }} key={i} /> : <StarBorderSharp style={{ color: "#ffa41c" }} key={i} />
                        })}
                        <span>
                            {item.review.length}
                        </span>
                    </div>
                    <div className='price'>
                        <center><h4 className='offer'>{item.offer}</h4></center>
                        <h4 className="discount_price"><span>₹</span>{item.offer && item.price ? offerPrice(item.price, item.offer) + '.00' : null}</h4>
                        <p className="actual_price">M.R.P.: <span>₹{item.price}.00</span></p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default ProductCard