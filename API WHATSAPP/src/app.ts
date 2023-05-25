import path from 'path';
import express, { Express, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { config, send } from './routers';

const app: Express = express();
const router: express.Router = express.Router();

// Configuração do middleware de parsing para dados do tipo urlencoded, JSON e raw data
app.use(express.json({ limit: '60mb' }));  // Middleware para interpretar dados JSON com limite de tamanho de 60mb
app.use(express.urlencoded({ limit: '60mb', extended: true, parameterLimit: 50000 }));  // Middleware para interpretar dados urlencoded com limite de tamanho de 60mb
app.use(express.static(path.join(process.cwd(), 'public')));  // Middleware para servir arquivos estáticos a partir do diretório 'public'

app.use(cors({
    origin: '*',  // Permite o acesso a partir de qualquer origem
    optionsSuccessStatus: 200,  // Define o código de status de sucesso para requisições preflight CORS
    methods: ["GET", "PUT", "POST", "DELETE"]  // Define os métodos HTTP permitidos nas requisições CORS
}));

// Configuração do middleware que permite o acesso ao servidor de qualquer domínio
app.use((_req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');  // Define o cabeçalho 'Access-Control-Allow-Origin' para permitir acesso de qualquer origem
    res.header('Access-Control-Allow-Headers', 'Content-Type, X-XSRF-Token, Origin');  // Define os cabeçalhos permitidos na requisição CORS
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');  // Define os métodos HTTP permitidos nas requisições CORS
    next();
});

// Middleware de tratamento de erros específico para o ambiente de desenvolvimento
if (app.get('env') === 'development') {
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        res.status(err.status || 500);
        res.send({
            message: err.message,
            error: err,
        });
    });
}

// Middleware de tratamento de erros genérico
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.send({
        message: err.message,
        error: {},
    });
});

// Iniciar as rotas
config(app);  // Configura as rotas definidas no arquivo 'config'
send(app);  // Configura as rotas definidas no arquivo 'send'

app.use(router);  // Utiliza o router definido anteriormente

const HOST_NAME = process.env.HOST_NAME || 'localhost';  // Obtém o nome do host do ambiente ou usa 'localhost' como padrão
const HOST_NAME_PORT = process.env.HOST_NAME_PORT || 3000;  // Obtém a porta do ambiente ou usa a porta 3000 como padrão

app.listen(HOST_NAME_PORT, () => {
    console.log(`Servidor Rodando ${HOST_NAME}:${HOST_NAME_PORT}`);  // Inicia o servidor na porta e exibe uma mensagem com o host e porta utilizados
});
