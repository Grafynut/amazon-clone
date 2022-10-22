import React, { useEffect, useState } from 'react';
import ProductCard from './productCard/ProductCard';
import ContentFullDetails from '../ContentFullDetails';
import './Product.css';
import { useNavigate } from 'react-router-dom';
import offerPrice from '../offerpriceCalculator';
import Filter from './Filter';

function Products() {
    const history = useNavigate();
    window.scrollTo(0, 0);
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let value = params.cet; // "some_value
    const Products = ContentFullDetails[value];
    const [productList, setProductList] = useState(null);
    //select from check box
    const [brandList, setBrandList] = useState([]); // brand 
    const [allbrandlistArr, setallbrandlistArr] = useState([]); // brandlistarr
    const [filterSectionVisibility, setFilterSectionVisibility] = useState(false);

    function loactionRefresh() {
        history(window.location.pathname + window.location.search)
    }

    // filter by catagory

    const getShortValue = (e) => {

        const value = e.target.value;

        switch (value) {
            case 'new_and_best':
                Products.sort((a, b) => {
                    return a.id - b.id
                })
                break;
            case 'low_to_heigh':
                Products.sort((a, b) => {
                    return offerPrice(a.price, a.offer) - offerPrice(b.price, b.offer)
                })
                break;

            case 'heigh_to_low':
                Products.sort((a, b) => {
                    return offerPrice(b.price, b.offer) - offerPrice(a.price, a.offer)
                })
                break;
            default:
                Products.sort((a, b) => {
                    return a.id - b.id
                })
                break;
        }

        //filter with limited and all item
        if (brandList.length > 0) {
            let result = Products.filter((item, index) => {
                if (brandList.includes(item.brand)) {
                    return item
                }
            })
            setProductList(result);
        } else {
            setProductList(Products);
        }

        loactionRefresh()
    }


    //add item in brand List
    const getselectvalue = (value) => {

        setBrandList((prev) => {
            if (!brandList.includes(value)) {
                return [...prev, value];
            } else {
                return prev;
            }
        })
    }

    //reove item in brand List
    const removeValue = (removeval) => {
        //brand list remove
        if (brandList.includes(removeval)) {
            let id = brandList.indexOf(removeval);
            setBrandList((prev) => {
                return prev.filter((item, index) => {
                    return index !== id;
                })
            })
        }

    }

    // filter on price range
    const getPriceRange = (min, max) => {
        let [minValue, maxValue] = [Number(min), Number(max)]
        let result = Products.filter((elem) => {
            let offerPricevalue = offerPrice(elem.price, elem.offer)
            return offerPricevalue > minValue && offerPricevalue < maxValue
        })
        setProductList(result)
        // loactionRefresh()
    }

    useEffect(() => {
        // in checkBox change item display
        Products.filter((item, id) => {
            if (brandList.includes(item.brand)) {
                setallbrandlistArr((prev) => {
                    if (!allbrandlistArr.includes(item)) {
                        return [...prev, item];
                    } else {
                        return prev
                    }
                })
            } else if (!brandList.includes(item.brand)) {
                allbrandlistArr.forEach((elem) => {
                    if (elem.brand === item.brand) {
                        let id = allbrandlistArr.indexOf(elem)
                        setallbrandlistArr((prev) => {
                            return prev.filter((element, index) => {
                                return index !== id
                            })
                        })

                    }
                })
            }
        })
        // check brandlist
        if (brandList.length > 0) {
            setProductList(allbrandlistArr);
        } else {
            setProductList(Products);
        }

        if (window.innerWidth > 575) {
            setFilterSectionVisibility(true)
        } else {
            setFilterSectionVisibility(false)
        }

    }, [brandList, allbrandlistArr])

    // filter section
    const handleFilterSection = () => {
        setFilterSectionVisibility(!filterSectionVisibility);
    }


    return (
        <div className='all_products'>
            <div className='top_right_filter'>
                <select className="filter" onChange={getShortValue}>
                    <option value="new_and_best">New and Best</option>
                    <option value="low_to_heigh">price: Low to High</option>
                    <option value="heigh_to_low">price: High to Low</option>
                </select>
            </div>
            {/* style={{ display: filterSectionVisibility ? "block" : 'block' }} */}
            <button onClick={handleFilterSection} className='filter_button'>Filter</button>
            <div className={filterSectionVisibility ? "filter_section addFilter" : "filter_section removeFilter"} >
                <Filter productlist={Products}
                    getselectvalue={getselectvalue}
                    removeValue={removeValue}
                    getPriceRange={getPriceRange}
                />
            </div>
            <div className='all_products_List'>
                <div className='product_section'>

                    {productList !== null ? productList.length < 1 ? <div className='product_not_found'>No Product found</div> : null : null}

                    {
                        productList?.map((item, i) => {
                            return (
                                <ProductCard
                                    key={i}
                                    item={item}
                                    cet={value}
                                />)
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default Products