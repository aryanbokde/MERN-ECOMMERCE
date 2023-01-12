export const fetch1 = async(url, type, body) => {    //2
    const res = await fetch(url, {
        method:type,
        headers:{
            "Content-Type" : "application/json",
            "auth-token": localStorage.getItem("token")
        },
        body:JSON.stringify(body)
    })
    return await res.json();

};

export const fetch2 = async(url, type) => {   //1
    const res = await fetch(url, {
        method:type,
        headers:{
            "Content-Type" : "application/json",
            "auth-token": localStorage.getItem("token")
        },
       
    })
    return await res.json();
};


