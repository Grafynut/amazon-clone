import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { Search, AddShoppingCartOutlined } from '@mui/icons-material';
import Content from '../Content';
import { useStateValue } from '../StateProvider';
import { auth } from '../../firebase';
import ContentFullDetails from '../ContentFullDetails';


function Header() {
    const [{ basket, user }, dispatch] = useStateValue();
    const allContent = Content.search;
    const [searchValue, setsearchValue] = useState('')// search value
    const history = useNavigate(); // location change
    const catagories = []; // cetagory 
    const [filterCatValue, setFilterCatValue] = useState([]);
    const allCetagory = Object.keys(ContentFullDetails);
    const [searchSeuggetionWidth, setSearchSeuggetionWidth] = useState(0)

    //location url query
    const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let cetValue = params.cet; // "some_value

    const handleAuthentication = () => {
        if (user) {
            auth.signOut();
        }
    }
    // search input
    const handleSearch = (e) => {
        setsearchValue(e.target.value);
        const width = e.target.offsetWidth;
        setSearchSeuggetionWidth(width)
    }

    //search buton click
    const handleOnSearchButtonCLick = () => {
        window.location.replace(`/search/productdetails?searchvalue=${searchValue.replace(" ", "%20")}`);
    }

    // payment and order path set
    const pathname = window.location.pathname;
    if (!user) {
        if (pathname === '/payment' || pathname === '/order') {
            history('/login');
        }
    } else {
        if (basket.length < 1 && pathname === '/payment') {
            history('/');
        }
    }

    // search section
    const handleSearchValue = (e) => {
        setsearchValue('')
    }

    //handleAllCetagory
    const handleAllCetagory = (e) => {
        let value = e.target.value;
        // history();
        window.location.replace(`/${value}?cet=${value}`)
    }

    useEffect(() => {
        if (searchValue.length > 0) {
            allContent.forEach((item) => {
                item?.cetagory?.forEach((cat) => {
                    if (!catagories.includes(cat)) {
                        catagories.push(cat);
                    }
                })
            })

            // search suggetions set
            const catFilter = catagories.filter((catSearch) => {
                return catSearch.substr(0, 10).toLowerCase().includes(searchValue.toLowerCase())
            })

            setFilterCatValue(catFilter)
        }
    }, [searchValue])


    return (
        <nav className='header'>
            {/* logo */}
            <Link to="/">
                <div className='nav_logo hover_border'>
                    <img className='header_logo' src={Content.logo.logo_white} alt='amazon' />
                    <span>.in</span>
                </div>
            </Link>
            {/* search box */}
            <div className='suggetion_box'>
                {searchValue.length > 0 &&
                    <div className='search_suggetion' style={{ width: `${searchSeuggetionWidth}px` }}>
                        {
                            filterCatValue?.map((element, i) => {
                                return <a href={`/search/productdetails?searchvalue=${element.replace(" ", "%20")}`} key={i}><div className='suggetion_item' data-value={element} onClick={handleSearchValue}  >{element}</div></a>
                            })}
                    </div>
                }
            </div>

            <div className='search_box'>
                <select className={searchValue.length > 0 ? 'select_box hideCetagoryTab' : 'select_box'} value={cetValue ? cetValue : "All Categories"} onChange={handleAllCetagory} >
                    <option className='option' disabled value={"All Categories"} >All Categories</option>
                    {allCetagory.map((elem, i) => {
                        return <option className='option' value={elem} key={i} >{elem}</option>
                    })}
                </select>
                <div className='input_searchBox'>
                    <input type='text' className='header_searchbar' value={searchValue} onChange={handleSearch} />
                    <div className='Search_btn' onClick={handleOnSearchButtonCLick}>
                        <Search className='searchIcon' />
                    </div>
                </div>
            </div>

            {searchValue.length > 0 && <div className='black_backgound'></div>}

            {/* links */}
            <div className='header_nav'>
                <Link to={user ? '/' : "/login"} className='header_link hover_border'>
                    <div className='header_option' onClick={handleAuthentication}>
                        <span>{user ? `${user.email.substr(0, 10)}...` : 'Hello'}</span>
                        <span>{user ? 'Log Out' : 'Sign in'}</span>
                    </div>
                </Link>

                <Link to={user ? "/order" : "/login"} className='header_link hover_border' >
                    <div className='header_option'>
                        <span>Return</span>
                        <span>& Orders</span>
                    </div>
                </Link>

                <Link to="/cart" className='header_link hover_border'>
                    <div className='header_option' >
                        <AddShoppingCartOutlined className='shopping_bag' />
                        <span className='shopping_Item_num'>{basket.length}</span>
                    </div>
                </Link>
            </div>

        </nav>
    )
}

export default Header;