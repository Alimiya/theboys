const fdb = require("../fdb/firebase").fdb;
const storage = require('../fdb/firebase').storage;
const uuid = require('uuid-v4')
const fs = require('fs')

const metadata = {
    metadata: {
        firebaseStorageDownloadTokens: uuid()
    },
    contentType: 'image/png',
    cacheControl: 'public, max-age=31536000',
};

exports.create = async (req, res) => {
    var r = { r: 0 };
    const { attraction_name, description, short_description, address, week_days, open_time, close_time, price, phone, bus } = req.body;
    const attraction_img = req.file;
    console.log(req.body)

    if (!attraction_name || !description ||!short_description || !address || !week_days || !open_time || !close_time || !price || !phone || !bus) {
        fs.unlink(attraction_img.path, () => { })
        return res.send(JSON.stringify(r));
    }

    await fdb.collection('attractions').add({
        attraction_name: attraction_name,
        description: description,
        short_description: short_description,
        address: address,
        schedule: {
            week_days: week_days,
            open_time: open_time,
            close_time: close_time
        },
        price: price,
        phone: phone,
        bus: bus
    }).then(async (attraction) => {
        await storage.upload(attraction_img.path, {
            gzip: true,
            metadata: metadata,
            destination: `attractions/${attraction.id}`
        });
        var attraction_img_url = `https://firebasestorage.googleapis.com/v0/b/smart-guide-d28d6.appspot.com/o/attractions%2F${attraction.id}?alt=media`

        await fdb.collection('attractions').doc(attraction.id).update({ attraction_img: attraction_img_url }).then(() => {
            r['r'] = 1;
            res.send(r);
            fs.unlink(attraction_img.path, () => { });
        });

    }).catch((e) => {
        console.log(e)
        res.send(JSON.stringify(r));
        fs.unlink(attraction_img.path, () => { });
    })
}
exports.get = async (req, res) => {
    let data = [];

    try {
        const attractions = await fdb.collection('attractions').get();
        attractions.docs.forEach((attraction) => {
            data.push({ ...attraction.data(), attraction_id: attraction.id });
        });
        res.send(data);
    } catch (err) {
        console.log(err);
    };
}

exports.update = async (req, res) => {

}
exports.delete = async (req, res) => {

}
exports.getTotalStats = async (req, res) => { }
exports.getStatsByDate = async (req, res) => { }
exports.getStatsByMonth = async (req, res) => { }
exports.getStatsByYear = async (req, res) => { }