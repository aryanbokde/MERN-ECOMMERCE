export const fetch1 = async(link, type, body) => {    //2
    const res = await fetch(link, {
        method:type,
        headers:{
            "Content-Type" : "application/json"
        },
        body:JSON.stringify(body)
    })
    return await res.json();
};

export const fetch2 = async(url, type) => {   //1
    const res = await fetch(url, {
        method:type,
        headers:{
            "Content-Type" : "application/json"
        },       
    })
    return await res.json();
};

export const refreshPage = (page) =>{
    setTimeout(()=>{
        window.location.reload(page);
    }, 1000);
};
