import MugCard from "./MugCard.jsx";
import mug1 from "../../images/mug1.png"
import mug2 from "../../images/mug2.png"
import mug3 from "../../images/mug3.png"

export const mugs = [
    {
        id: 1,
        name: 'Hello Kitty/Melody Ceramic Mug',
        price: 24.99,
        originalPrice: 29.99,
        sellNumbers: 1500,
        description: 'Elegant and durable ceramic mug with a classic design. Perfect for your morning coffee or tea.',
        features: [
            'Dishwasher safe',
            'Microwave safe',
            'Holds 12oz of liquid',
            'Made from high-quality ceramic'
        ],
        images: [
            mug1,
            mug1,
            mug1,
            mug1,
            mug1
        ]
    },
    {
        id: 2,
        name: 'Alien x Croc Mug',
        price: 29.99,
        sellNumbers: 2000,
        description: 'Inspired by ocean waves, this beautiful mug brings serenity to your daily routine.',
        features: [
            'Handcrafted design',
            'Dishwasher and microwave safe',
            'Holds 14oz of liquid',
            'Limited edition collection'
        ],
        images: [
            mug2,
            mug2,
            mug2,
            mug2,
            mug2
        ]
    },
    {
        id: 3,
        name: 'Halloween Mug',
        price: 27.99,
        originalPrice: 34.99,
        sellNumbers: 1200,
        description: 'Delicate cherry blossom design brings a touch of springtime to your beverage experience.',
        features: [
            'Premium porcelain',
            'Dishwasher safe',
            'Holds 10oz of liquid',
            'Gift box included'
        ],
        images: [
            mug3,
            mug3,
            mug3,
            mug3,
            mug3
        ]
    },
];

export default function MugList() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mugs.map((mug) => (
                <MugCard
                    key={mug.id}
                    id={mug.id}
                    name={mug.name}
                    price={mug.price}
                    originalPrice={mug.originalPrice}
                    image={mug.images[0]}
                    sellNumbers={mug.sellNumbers}
                />
            ))}
        </div>
    );
}