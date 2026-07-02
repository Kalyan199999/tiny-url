import { Request,Response,NextFunction } from 'express'

let counter = 0;

export function UpadteCounter( request:Request,response:Response,next:NextFunction ) 
{
    const count = counter%10;
    
    counter = counter%10+1;

    request.body.counter = count;

    next();
}