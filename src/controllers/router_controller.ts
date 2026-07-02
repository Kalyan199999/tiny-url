import { Request,Response } from "express";
import { addUrl,getUrl } from '../database/queries.js'
import { checkUserName,checkUrl,checkShortUrl } from '../utilities/utility.js'
import md5 from 'md5';

export async function addNewUrl( request:Request , response:Response ) 
{
    try
    {
        console.log(request.body);
        
        const { user_name,url,counter } = request.body;

        if( !checkUserName(user_name) )
        {
            return response.status(400).json({
                ok:false,
                message:"User name is requred!"
            })
        }

        if( !checkUrl(url) )
        {
            return response.status(400).json({
                ok:false,
                message:"Url is Invalid!"
            })
        }

        const hash = md5( url.trim() );

        const payload = {
            user_name:String(user_name).toLocaleLowerCase().trim(),
            original_url:String(url).trim(),
            short_url:String(hash).substring(0,5).concat(counter)
        }

        const res = await addUrl( payload );

        if( !res )
        {
            return response.status(401).json({
                ok:false,
                message:"Url insertion is failed!"
            })
        }

        res.short_url = `tiny-url/${res.short_url}`

        return response.status(201).json({
            ok:true,
            message:"Short url is created!",
            data:res
        })

    }
    catch(error:any)
    {
        console.log(`Error occured:${error.message}`);
        return response.status(500).json({
            ok:false,
            message:"Internal server Issue!"
        })
    }
}

export async function fecthUrl( request:Request , response:Response )
{
    try
    {
        const { short_url } = request.params;

        if( !short_url )
        {
            return response.status(400).json({
                ok:false,
                message:"Provide the short url!"
            })
        }

        const url = Array.isArray(short_url) ? short_url[0] : short_url;

        console.log(url);

        if( !checkShortUrl(url) )
        {
            return response.status(400).json({
                ok:false,
                message:"Invalid url"
            })
        }

        const res = await getUrl( url.trim() );

        if (!res || !res.original_url) {
            return response.status(400).json({
                ok: false,
                message: "No valid url is found!"
            });
        }
        
        return response.redirect(302, res.original_url );
    }
    catch(error:any)
    {
        console.log(`Error occured:${error.message}`);
        return response.status(500).json({
            ok:false,
            message:"Internal server Issue!"
        })
    }
}