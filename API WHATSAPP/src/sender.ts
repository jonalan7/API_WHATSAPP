//import { start } from 'repl';
import { create, Whatsapp, Message, SocketState } from 'venom-bot';

class Sender{
    private client: Whatsapp;

    constructor(){
        this.initialize()
    }

    //ENVIANDO TEXTO
    async sendText(to: string, body: string){

        this.client.sendText(to, body)
    }

    //METODO Q VAI CRIAR O VENOM-BOT
    private initialize(){
        //GERA QRCODE
        const qr = (base64Qrimg: string) => {}

        //GERA O STATUS
        const status = (statusSession: string) => {}

        //DÁ O START    
        const start = (client: Whatsapp) => {
            this.client = client

            this.sendText("5583987368495@c.us", "API-TESTE")
        }

        create('whatsappbot', qr, status)
        .then((client) => start(client))
        .catch((error) => console.log(error))
    }
}

export default Sender