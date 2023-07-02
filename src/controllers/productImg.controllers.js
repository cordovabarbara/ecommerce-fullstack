const catchError = require('../utils/catchError');
const ProductImg = require('../models/ProductImg');

const getAll = catchError(async(req, res) => {
    const result = await ProductImg.findAll()
    return res.json(result)
});

const create = catchError(async(req, res) => {
    const url = req.protocol + "://" + req.headers.host + "/uploads/" + req.file.filename;
	const filename = req.file.filename;

    const body = {url, filename}
    const result = await ProductImg.create(body);
    return res.status(201).json(result);
});

module.exports = {
    getAll,
    create
}