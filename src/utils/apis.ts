interface commentType {
    name: string;
    comment: string;
}

interface statusType {
  status: string;
}

interface roleType {
    email: string;
    role: string;
}


const getComments = async (page: number) => {
    let cookie = document.cookie;
    let token = cookie.split('=')[1];

    try {
        const response: any = await fetch(`http://localhost:3000/request/?page=${page}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })

        let result = response;
        return result;
    } catch (err) {
        console.log(err);
    }
}


const postComments = async (newComment: commentType, id: string) => {
    let cookie = document.cookie;
    let token = cookie.split('=')[1];
    console.log('new', newComment)

    try {
        const response = await fetch('http://localhost:3000/request/comment/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(newComment)
        });
        console.log(response)
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

const updateRequestStatus = async (status: statusType, id: string) => {
    let cookie = document.cookie;
    let token = cookie.split('=')[1];

    try {
        const response = await fetch('http://localhost:3000/request/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(status)
        });
        
        return response.json();
    } catch (err) {
        console.log(err);
    }
}


const getUsers = async () => {
    let cookie = document.cookie;
    let token = cookie.split('=')[1];

    try {
        const response = await fetch('http://localhost:3000/user', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

const getAgents = async () => {
    let cookie = document.cookie;
    let token = cookie.split('=')[1];

    try {
        const response = await fetch('http://localhost:3000/agent', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

const getAdmins = async () => {
    let cookie = document.cookie;
    let token = cookie.split('=')[1];

    try {
        const response = await fetch('http://localhost:3000/admin', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        });
        
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

const updateUserRole = async (role: roleType | {}) => {
    let cookie = document.cookie;
    let token = cookie.split('=')[1];
    
    try {
        const response = await fetch('http://localhost:3000/admin/update', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(role)
        });
        
        return response.json();
    } catch (err) {
        console.log(err);
    }
}

export {
    getComments,
    postComments,
    updateRequestStatus,
    getAdmins,
    getAgents,
    getUsers,
    updateUserRole
}