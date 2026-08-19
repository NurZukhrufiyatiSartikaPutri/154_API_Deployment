const db = require("../models");

const Genre = db.Genre;

async function getAll(req, res) {
    try {
        const genres = await Genre.findAll();

        return res.status(200).json(genres);
    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function create(req, res) {
    try {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Nama genre wajib diisi."
            });
        }

        const existingGenre = await Genre.findOne({
            where: { name }
        });

        if (existingGenre) {
            return res.status(409).json({
                message: "Genre sudah ada."
            });
        }

        const genre = await Genre.create({
            name
        });

        return res.status(201).json({
            message: "Genre berhasil ditambahkan.",
            data: genre
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function update(req, res) {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const genre = await Genre.findByPk(id);

        if (!genre) {
            return res.status(404).json({
                message: "Genre tidak ditemukan."
            });
        }

        await genre.update({
            name
        });

        return res.status(200).json({
            message: "Genre berhasil diperbarui.",
            data: genre
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

async function remove(req, res) {
    try {
        const { id } = req.params;

        const genre = await Genre.findByPk(id);

        if (!genre) {
            return res.status(404).json({
                message: "Genre tidak ditemukan."
            });
        }

        await genre.destroy();

        return res.status(200).json({
            message: "Genre berhasil dihapus."
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {
    getAll,
    create,
    update,
    remove
};