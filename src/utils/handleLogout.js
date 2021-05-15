export function handleRedirectBeforeLogout (history){
    if(history && history.location){
        const pathname = history.location.pathname;
        history.push(`/login${pathname !== '/login' && `?rdr=${pathname}`}`)
    }
}