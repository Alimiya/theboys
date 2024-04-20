const { generateAdminToken } = require("../middlewares/token")
const {logger} = require("../middlewares/winston");
const fauth = require('../fdb/firebase').fauth;

exports.login = async function (req, res, next) {
    let r = { r: 0 };
    const { email, password } = req.body;
    try {
        fauth.signInWithEmailAndPassword(fauth.getAuth(), email, password).then((userCredential) => {
            const user_id = userCredential.user.uid;
            
            const token = generateAdminToken(userCredential)
            res.cookie('admin', token, { maxAge: process.env.TOKEN_EXPIRE * 100000 })
            res.header('Authorization', `Bearer ${token}`)
            r['r'] = 1;
            logger.info(`${email} entered to website`)
            res.send(r)
        });
    } catch (err) {
        console.error('Internal Server Error')
        logger.error(err.message)
        res.send(r);
    }
}

exports.logout = async function (req, res, next) {
    let r = { r: 1 };
    const admin = req.user._id
    res.clearCookie('admin')
    logger.info(`${admin} logged out`)
    res.header('Authorization', null);
    res.send(r)
}