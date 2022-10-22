import { fashion } from './content/fashion';
import { decore } from './content/decore';
import { brands } from './content/brands';
import { tech } from './content/tech';


//logo 
import logo_white from '../image/amazon_logo_white.png';
import logo_black from '../image/amazon_logo_black.webp';
// banner
import banner_1 from '../image/banner_1.jpg';
import banner_2 from '../image/banner_2.jpg';
import banner_3 from '../image/banner_3.jpg';
import banner_4 from '../image/banner_4.jpg';

// multy card 1
import card_1 from '../image/card_image/card_1.jpg';
import card_2 from '../image/card_image/card_2.jpg';
import card_3 from '../image/card_image/card_3.jpg';
import card_4 from '../image/card_image/card_4.jpg';
import card_5 from '../image/card_image/card_5.jpg';
import card_6 from '../image/card_image/card_6.jpg';
import card_7 from '../image/card_image/card_7.jpg';
import card_8 from '../image/card_image/card_8.jpg';
import card_9 from '../image/card_image/card_9.jpg';
import card_10 from '../image/card_image/card_10.jpg';
import card_11 from '../image/card_image/card_11.jpg';
import card_12 from '../image/card_image/card_12.jpg';


const Content = {
    logo: {
        logo_white: logo_white,
        logo_black: logo_black,
    },

    banner: [
        banner_1,
        banner_2,
        banner_3,
        banner_4,
    ],

    // first 3 card
    multicards1: [
        {
            card: {
                heading: "Starting ₹199 | fashion",
                cetagory: "fashion",
                cardDetails: [
                    { image: card_1, details: "Clothing" },
                    { image: card_2, details: "Footwear" },
                    { image: card_3, details: "Watches" },
                    { image: card_4, details: "Bags & Luggage" }
                ]
            }
        },
        {
            card: {
                heading: "Starting Rs.49 | Home, Kitchen & more",
                cetagory: "decore",
                cardDetails: [
                    { image: card_5, details: "Starting ₹99 | Home & decor" },
                    { image: card_6, details: "Starting ₹49 | Cookware & Dining" },
                    { image: card_7, details: "Starting ₹49 | Sports & Fitness" },
                    { image: card_8, details: "Starting ₹79 | Home improvement" }
                ]
            }
        },
        {
            card: {
                heading: "Up to 70% off | Amazon Brands & more",
                cetagory: "brands",
                cardDetails: [
                    { image: card_9, details: "Up to 55% off | TVs, Refrigerators & more" },
                    { image: card_10, details: "Up to 60% off | Home & kitchen" },
                    { image: card_11, details: "Up to 60% off | Daily essentials" },
                    { image: card_12, details: "Under ₹599 | Clothing, shoes & more" }
                ]
            }
        }
    ],

    // home page scroll items
    scrollCard: [
        { card: [...tech], cetagory: "tech", heading: "Blockbuster Deals" },
        { card: [...fashion], cetagory: "fashion", heading: "Blockbuster Deals" },
        { card: [...decore], cetagory: "decore", heading: "Blockbuster Deals" },
    ],

    search: [...tech, ...fashion, ...decore, ...brands]
};

export default Content;