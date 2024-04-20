const fdb = require("../fdb/firebase").fdb
const storage = require('../fdb/firebase').storage
const uuid = require('uuid-v4')
const fs = require('fs')

const metadata = {
    metadata: {
        firebaseStorageDownloadTokens: uuid()
    },
    contentType: 'image/png',
    cacheControl: 'public, max-age=31536000',
}

exports.create = async (req, res) => {
    var r = { r: 0 }
    const { attraction_name, description, short_description, address, schedule, phone, bus } = req.body
    const attraction_img = req.file

    try {
        if (!attraction_img) return res.send(JSON.stringify(r))
        if (!attraction_name || !description || !short_description || !address || !schedule || !phone || !bus) {
            fs.unlink(attraction_img.path, () => { })
            return res.send(JSON.stringify(r))
        }

        await fdb.collection('attractions').add({
            attraction_name: attraction_name,
            description: description,
            short_description: short_description,
            address: address,
            schedule: schedule,
            phone: phone,
            bus: bus
        }).then(async (attraction) => {
            await storage.upload(attraction_img.path, {
                gzip: true,
                metadata: metadata,
                destination: `attractions/${attraction.id}`
            })
            var attraction_img_url = `https://firebasestorage.googleapis.com/v0/b/smart-guide-d28d6.appspot.com/o/attractions%2F${attraction.id}?alt=media`

            await fdb.collection('attractions').doc(attraction.id).update({ attraction_img: attraction_img_url }).then(() => {
                r['r'] = 1
                res.send(r)
                fs.unlink(attraction_img.path, () => {
                })
            })

        })
    } catch (e) {
        res.send(JSON.stringify(r))
        fs.unlink(attraction_img.path, () => {
        })
    }
}
exports.get = async (req, res) => {
    let data = []

    try {
        const attractions = await fdb.collection('attractions').get()
        attractions.docs.forEach((attraction) => {
            data.push({ ...attraction.data(), attraction_id: attraction.id })
        })
        res.send(data)
    } catch (err) {
        console.log(err)
    }
}

exports.update = async (req, res) => {
    let r = { r: 0 };
    let { attraction_id, attraction_name, description, short_description, address, schedule, phone, bus } = req.body;
    let new_attraction_img = req.file;

    if (!attraction_name || !description || !short_description || !address || !schedule || !phone || !bus) {
        return res.send(JSON.stringify(r));
    }

    try {
        if (new_attraction_img != undefined) {
            var file = storage.file(`attractions/${attraction_id}`);
            await file.delete();
            await storage.upload(new_attraction_img.path, {
                gzip: true,
                metadata: metadata,
                destination: `attractions/${attraction_id}`
            });
            fs.unlink(new_attraction_img.path, () => { });
        }


        let updateData = {
            attraction_name, description, short_description, address, schedule, phone, bus
        };

        if (new_attraction_img != undefined) {
            updateData.attraction_img = `https://firebasestorage.googleapis.com/v0/b/smart-guide-d28d6.appspot.com/o/attractions%2F${attraction_id}?alt=media`
        }


        await fdb.collection('attractions').doc(attraction_id).update(updateData);
        console.log('uio');
        r['r'] = 1;
        r['attraction_id'] = attraction_id;
        res.send(r);
    } catch (e) {
        console.log(e);
        res.send(r);
    }
}
exports.delete = async (req, res) => {
    let r = { r: 0 };

    let attraction_id = req.body.attraction_id;

    if (!attraction_id) {
        return res.send(r);
    }

    try {
        await fdb.collection('attractions').doc(attraction_id).delete().then(async () => {
            var file = storage.file(`attractions/${attraction_id}`);
            await file.delete().then(() => {
                r['r'] = 1;
                r['attraction_id'] = attraction_id;
                res.send(r);
            })
        })
    } catch (e) {
        console.log(e);
        res.send(r);
    }



}
exports.getTotalStats = async (req, res) => {
}
exports.getStatsByDate = async (req, res) => {
}
exports.getStatsByMonth = async (req, res) => {
}
exports.getStatsByYear = async (req, res) => {
}