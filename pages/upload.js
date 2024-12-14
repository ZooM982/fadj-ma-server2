import nextConnect from 'next-connect';
import multer from 'multer';
import Image from '../../models/Image';
import mongoose from 'mongoose';

const upload = multer({ dest: './uploads/' });

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.error('Error:', error);
        res.status(500).send('Erreur Serveur');
    },
});

apiRoute.use(upload.single('file'));

apiRoute.post(async (req, res) => {
    try {
        // const { file } = req.body;

        // if (!file) {
        //     return res.status(400).json({ msg: 'Veuillez fournir un fichier et un nom' });
        // }

        const image = new Image({
            data: file.buffer,
            contentType: file.mimetype,
        });

        await image.save();

        res.json({ msg: 'Image ajoutée avec succès' });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ msg: 'Erreur Serveur' });
    }
});

export default apiRoute;
