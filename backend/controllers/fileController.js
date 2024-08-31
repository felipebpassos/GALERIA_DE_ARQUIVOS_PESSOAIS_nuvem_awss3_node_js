const s3 = require('../config/awsS3');
const Arquivo = require('../models/Arquivo');
const User = require('../models/User');

// Upload de arquivo para S3 e salvar no banco de dados
exports.uploadFile = async (req, res) => {
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'Arquivo não fornecido.' });
    }

    const userId = req.userId; // Obtém userId do middleware de autenticação

    if (!userId) {
        return res.status(401).json({ message: 'ID do usuário não fornecido.' });
    }

    // Verifique se o usuário existe
    const userExists = await User.findByPk(userId);
    if (!userExists) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // Determine o diretório com base no tipo de arquivo
    let folder = '';
    if (file.mimetype.startsWith('image/')) {
        folder = 'fotos/';
    } else if (file.mimetype.startsWith('video/')) {
        folder = 'videos/';
    } else {
        folder = 'outros/';
    }

    // Cria uma chave única com base na data e hora
    const timestamp = Date.now();
    const filename = `${timestamp}_${file.originalname}`;
    const key = `${folder}${filename}`;

    const s3Params = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        console.log('Iniciando upload para S3 com os parâmetros:', s3Params);

        // Realiza o upload para o S3
        const s3Data = await s3.upload(s3Params).promise();
        console.log('Upload para o S3 bem-sucedido:', s3Data);

        // Salva os detalhes do arquivo no banco de dados
        const arquivo = await Arquivo.create({
            user_id: userId,
            filename: filename, // Salva o nome do arquivo com timestamp
            tipo: file.mimetype.startsWith('image/') ? 'foto' : 'video'
        });

        console.log('Arquivo salvo no banco de dados:', arquivo);
        res.status(201).json({ message: 'Upload realizado com sucesso.', arquivo });
    } catch (err) {
        console.error('Erro durante o upload do arquivo:', err);
        res.status(500).json({ message: 'Erro ao fazer upload do arquivo.', details: err.message });
    }
};

// Listar arquivos no banco de dados
exports.getFiles = async (req, res) => {
    const userId = req.userId; // Obtém userId do middleware de autenticação

    if (!userId) {
        return res.status(401).json({ message: 'ID do usuário não fornecido.' });
    }

    try {
        // Busca os arquivos associados ao usuário
        const arquivos = await Arquivo.findAll({ where: { user_id: userId } });

        if (!arquivos.length) {
            return res.status(404).json({ message: 'Nenhum arquivo encontrado.' });
        }

        // Gera URLs pré-assinadas para cada arquivo
        const arquivosComUrl = await Promise.all(arquivos.map(async (arquivo) => {
            // Determine o diretório com base no tipo do arquivo
            let folder = '';
            if (arquivo.tipo === 'foto') {
                folder = 'fotos/';
            } else if (arquivo.tipo === 'video') {
                folder = 'videos/';
            } else {
                folder = 'outros/';
            }

            const s3Params = {
                Bucket: process.env.AWS_S3_BUCKET,
                Key: `${folder}${arquivo.filename}`, // Usa o nome do arquivo com timestamp e o diretório
                Expires: 900, // Expiração da URL (em segundos)
            };

            // Gera a URL pré-assinada para download
            try {
                const url = s3.getSignedUrl('getObject', s3Params);
                return {
                    ...arquivo.toJSON(),
                    s3_url: url, // Adiciona a URL pré-assinada ao objeto
                };
            } catch (error) {
                console.error('Erro ao gerar URL pré-assinada:', error);
                return {
                    ...arquivo.toJSON(),
                    s3_url: null, // Defina um valor padrão ou trate o erro conforme necessário
                };
            }
        }));

        res.status(200).json(arquivosComUrl);
    } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
        res.status(500).json({ message: 'Erro ao buscar arquivos.', details: error.message });
    }
};





