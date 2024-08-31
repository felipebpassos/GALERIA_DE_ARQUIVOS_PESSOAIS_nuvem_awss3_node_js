// conexao.js

async function login(username, password) {
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            const errorData = await response.text(); // Recebe o texto de erro
            throw new Error(errorData || 'Erro ao tentar fazer login');
        }

        return response.json();
    } catch (error) {
        throw new Error(error.message || 'Erro desconhecido');
    }
}

// Função para enviar dados de cadastro para o backend
async function register(username, password) {
    try {
        console.log('Enviando dados de cadastro para o backend:', { username, password });

        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        console.log('Resposta do servidor:', response);

        // Verifica se a resposta não é OK
        if (!response.ok) {
            const errorData = await response.json(); // Recebe o JSON de erro
            console.log('Dados de erro recebidos:', errorData);
            throw new Error(errorData.message || 'Erro ao tentar fazer o cadastro');
        }

        // Se a resposta for OK, processa o JSON de sucesso
        const result = await response.json();
        console.log('Dados de sucesso recebidos:', result);
        return result;
    } catch (error) {
        // Registra o erro e lança uma nova exceção com uma mensagem padrão
        console.error('Erro na função de cadastro:', error);
        throw new Error(error.message || 'Erro desconhecido');
    }
}

async function getFiles() {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/api/files', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        const errorText = await response.text(); // Capture the error text
        console.error('Erro ao listar arquivos:', errorText);
        throw new Error('Erro ao listar arquivos.');
    }

    const data = await response.json();
    console.log('Arquivos retornados:', data); // Log the files data
    return data;
}

async function uploadFile(file) {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:3000/api/files/upload', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Erro da API:', errorData);
            throw new Error(errorData.message || 'Erro ao fazer upload do arquivo.');
        }

        return response.json();
    } catch (error) {
        console.error('Erro capturado:', error);
        throw error;
    }
}

async function verifyToken() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const response = await fetch('http://localhost:3000/api/auth/verify-token', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const result = await response.json();
        return result.valid;
    } catch (error) {
        console.error('Erro ao verificar o token:', error);
        return false;
    }
}

