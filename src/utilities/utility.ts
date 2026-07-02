export function checkUserName(userName:string)
{
    if( userName.trim().length === 0 ) return false;

    return true;
}

export function checkUrl(url:string)
{
    if( url.trim().length === 0 ) return false;

    const regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.\-\?&\=\+#~%]*)\/?$/;
;

    if( regex.test(url.trim()) )
    {
        return true;
    }

    return false;
}

export function checkShortUrl(url:string)
{
    if( url.trim().length !== 6 ) return false;

    return true;
}