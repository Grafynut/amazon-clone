import React from 'react';
import './Home.css';
import Slide from './Slide';
import Card from './card/Card';
import Content from '../Content';

function Home() {
    const cardImage1 = Content.multicards1;
    const scrollCard = Content.scrollCard;

    return (
        <div className='home'>
            <Slide />
            <div className='body_content_start'>
                <div className='card_row'>
                    {cardImage1?.map((item, index) => {
                        return <Card heading={item.card.heading} cardLenth={cardImage1.length} cardDeatils={item.card.cardDetails} key={index} linkdetails="See all offers" cetagory={item.card.cetagory} />
                    })}
                </div>
                {
                    scrollCard?.map((item, index) => {
                        return (
                            <div className='product_list' key={index} >
                                <Card heading={item.heading} cardDeatils={item.card} linkdetails="See all products" Linkpage={true} control={true} cetagory={item.cetagory} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home;