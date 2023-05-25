import { Request, Response } from 'express';
import { initializeWpp } from "../controllers";

export default (app: any) => {
    app.get(`/${process.env.VERSION_ROUTER}/sendText/:number`, async (req: Request, res: Response) => {

    })

}
