const mongoose = require('mongoose');
const config = require('./config');
const Category = require("./models/Category");
const Product = require("./models/Product");
const User = require("./models/User");

const run = async () => {
    await mongoose.connect(config.mongo.db, config.mongo.options);

    const collections = await mongoose.connection.db.listCollections().toArray();

    for (const coll of collections) {
        await mongoose.connection.db.dropCollection(coll.name);
    }

    const [comp, cars, other, furniture] = await Category.create({
        title: 'Computers',
    }, {
        title: 'Cars',
    }, {
        title: 'Other',
    }, {
        title: 'furniture'
    });

    const [boke, olga, dilde] = await User.create({
        email: 'ok@gmail.com',
        displayName: 'Boke',
        password: '123',
        phoneNumber: '555-78-45-12',
        token: '00000'
    }, {
        email: 'not@gmail.com',
        displayName: 'Olga',
        password: '1234',
        phoneNumber: '555-47-55-12',
        token: '000'
    }, {
        email: 'good@gmail.com',
        displayName: 'Dilde',
        password: '000',
        phoneNumber: '705-47-55-12',
        token: '111'
    });

    await Product.create({
        category: comp,
        user: olga,
        title: '2021 Apple MacBook Pro',
        price: 2539,
        description: '(16-inch, Apple M1 Pro chip with 10‑core CPU and 16‑core GPU, 16GB RAM, 1TB SSD) - Space Gray',
        image: 'macbook-pro-13_overview__bcsyunk73i2a_og.jpg'
    }, {
        category: cars,
        user: boke,
        title: '1979 Mercedes-Benz ',
        price: 1500,
        description: 'It’s not every day you find a 1979 Mercedes 450SL cream puff that has been happily resting in a garage for 35 of the past 40 odd years. So feast your eyes on the low-mileage Light Ivory and dark brown example up for auction today.',
        image: 'Mercedes S-Class 2021 UK-18.jpg'
    }, {
        category: other,
        user: dilde,
        title: 'Тонометр ZK-B869YD',
        price: 20,
        description: 'питание: 4ААА+USB, инстр. на англ. языке (1/30)',
        image: 'Tonometr_na_plecho_Omron_M2_Classic_HEM_7122_LRU.jpg'
    }, {
        category: furniture,
        user: boke,
        title: 'Table Settimo',
        price: 500,
        description: 'пWEEK / DRAWER IN MADAGASCAR EBONY WOOD DRAWER MATT LACQUERED CHARCOAL GRAY, FRONT OF DRAWERS COVERED IN NATURAL LEATHER WITH EBONY MASS PROFILE, INSERT IN BLACK PARAPAN, FEET AND ACCESSORIES HANDLES IN SATIN-FINISH STEEL, HANDLES IN STAINLESS STEEL COVERED IN NATURAL LEATHER.',
        image: 'modern-table-design.jpeg'
    }, {
        category: furniture,
        user: olga,
        title: 'Sofa',
        price: 395,
        description: 'When it comes to flexibility, our Stark sofa with reversible chaise is an ace. Streamlined and sophisticated, the design allows you to dictate the direction you lounge in thanks to a movable ottoman. ',
        image: '253180_grey_fabric_reversible_sofa_chaise_signature_01.jpg'
    });

    await mongoose.connection.close();
};

run().catch(e => console.log(e));