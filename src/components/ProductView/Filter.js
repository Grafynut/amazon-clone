import React, { useEffect, useRef, useState } from 'react'
import offerPrice from '../offerpriceCalculator';

function Filter({ productlist, getselectvalue, removeValue, getPriceRange }) {
    const brand = [];
    const PriceArr = [];

    // brand display array
    productlist?.map((elem) => {
        if (!brand.includes(elem.brand)) {
            brand.push(elem.brand)
        }
        let price = offerPrice(elem.price, elem.offer)
        PriceArr.push(price)
    })
    let maxprice = PriceArr.sort((a, b) => b - a);
    let max = maxprice[0] + 50;
    let min = maxprice[maxprice.length - 1] - 50;

    const [priceValue, setpriceValue] = useState(max); // rang and maxvalue input value  
    const [minpriceValue, setminpriceValue] = useState(min); // minValue input value

    // get brand value
    const getSelectedBrand = (e) => {
        if (e.target.checked) {
            getselectvalue(e.target.value)
        } else {
            removeValue(e.target.value)
        }
    }


    // handle Price Filter
    const handlePriceFilter = (e) => {
        setpriceValue(e.target.value);
    }

    const handleMinPrice = (e) => {
        if (e.target.value > max) return;
        setminpriceValue(e.target.value)
    }

    const handleMaxPrice = (e) => {
        if (e.target.value > max) return;
        setpriceValue(e.target.value)
    }

    useEffect(() => {
        getPriceRange(minpriceValue, priceValue)
    }, [priceValue, minpriceValue])



    return (
        <>
            <div className='filter_using_box'>
                <h5>Seller</h5>
                {brand?.map((item, i) => {
                    return <div className='inputbox' key={i} >
                        <input type={'checkbox'} value={item} id={"input" + i} onChange={getSelectedBrand} />
                        <span>{item}</span>
                    </div>

                })}
            </div>
            <div className='filter_using_box'>
                <h5>Filter by Price</h5>
                <input type={'range'} min={minpriceValue} max={max} value={priceValue} onChange={handlePriceFilter} />
                <input type={'number'} value={minpriceValue} onChange={handleMinPrice} />
                <span>To</span>
                <input type={'number'} value={priceValue} onChange={handleMaxPrice} />
            </div>
        </>
    )
}

export default Filter