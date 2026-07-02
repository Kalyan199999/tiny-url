import supabase from "./config.ts";
import { Payload } from '../types/Payload.ts';

export async function addUrl( payload:Payload )
{
    try
    {
        const { data , error } = await supabase
                                        .from('tiny-url')
                                        .insert( payload )
                                        .select("user_name,original_url,short_url")
                                        .single();
        if( error )
        {
            console.log(`error occured during insertion:${error.message}`);
            return null;
        }

        return data;
    }
    catch( error:any)
    {
        console.log(`error occured during insertion:${error.message}`);
        return null;
    }
}

export async function getUrl(url:string)
{
    try
    {
        const { data , error } = await supabase
                                        .from('tiny-url')
                                        .select("user_name,original_url,short_url")
                                        .eq("short_url",url)
                                        .single();
        if( error )
        {
            console.log(`error occured during fetching:${error}`);
            return null;
        }

        return data;
    }
    catch(error:any)
    {
        console.log(`error occured during fetching:${error.message}`);
        return null;
    }
}