import express from 'express'; // Importa o framework Express
import http from 'http'; // Importa o módulo HTTP do Node.js

import socketio from "socket.io"; // Importa o módulo Socket.io

const app = express(); // Cria uma instância do Express
const server = http.Server(app); // Cria um servidor HTTP usando o Express

app.use(express.static(`${__dirname}/public/`)); // Configura o servidor Express para servir arquivos estáticos na pasta "public"

const io = socketio(server); // Inicializa o Socket.io passando o servidor HTTP como argumento

io.on('connect', (socket) => { // Evento disparado quando um cliente se conecta ao servidor via WebSocket

    io.to(socket.id).emit({
        status: true,
        message: "conexão estabelecida com o servidor"
    });

    socket.on('teste', (res) => { // Evento 'teste' recebido do cliente via WebSocket
        console.log('MENSAGEM RECEBIDA', res); // Imprime o conteúdo recebido no console

        socket.broadcast.emit('teste', res);

    });
});

app.get('/', (req, res) => { // Define uma rota para a raiz do servidor
    res.render('index.html'); // Renderiza um arquivo HTML (certifique-se de que sua aplicação esteja configurada para renderizar arquivos HTML)
});

app.get('/teste', (req, res) => { // Define uma rota para "/teste"
    res.send('Aula de Express'); // Responde com a mensagem "Aula de Express"
});

server.listen(3333, () => { // Inicia o servidor na porta 3333
    console.log('SERVIDOR INICIADO NA PORTA', 3333); // Exibe uma mensagem no console quando o servidor é iniciado
});
