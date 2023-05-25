import { create, Whatsapp, Message, SocketState } from 'venom-bot';

export default new class initializeWpp {
    private client: Whatsapp;

    //ENVIANDO TEXTO
    async sendText(to: string, body: string) {

        //this.sendText("5583987368495@c.us", "API-TESTE")

        try {
            await this.client.sendText(to, body)
        } catch (error) {
            console.log(error)
        }
    }

    //METODO Q VAI CRIAR O VENOM-BOT
    private initialize(nameSession: string) {
        //GERA QRCODE
        const qr = (base64Qrimg: string) => { }

        //GERA O STATUS
        const status = (statusSession: string) => { }

        //DÁ O START    
        const start = (client: Whatsapp) => {
            this.client = client
            //this.sendText("5583987368495@c.us", "API-TESTE")

        }

        create(nameSession, qr, status)
            .then((client) => start(client))
            .catch((error) => console.log(error))
    }
}
