
import { Request, Response } from 'express';

export default (app: any) => {
    app.get(`/${process.env.VERSION_ROUTER}/connect/session/:name`, async (req: Request, res: Response) => {
        const { name } = req.params;
    })
}