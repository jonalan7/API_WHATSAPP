import Sender from "./sender";
import express, {Request, Response} from "express"

const sender = new Sender();

const app = express()

//JSON COMO FORMATO PADRÃO
app.use(express.json)

app.use(express.urlencoded({extended: false}))

//CONSULTAR SE O STATUS ESTA OK
app.get('/status', (req: Request, res: Response) => {
    //..
})

//ENVIA MENSAGENS
app.post('/send', async(req: Request, res: Response) => {
   try{
    await sender.sendText("5583987368495@c.us", "API-TESTE")
    return res.status(200).json()
   }catch(error){
    console.log(error)
    res.status(500).json({status: "error", message: error})
   }
})

app.listen(5000, () => {
    console.log("Servidor Rodando")
})
