
 export default async function Delete(name, id) {
    let valid = window.confirm(" !!!! Vous allez SUPPRIMER un record !!!!\n Vous ne pourrez pas revenir en arriere !");
    const token  = localStorage.getItem('token');

    if(valid) {
        const urlApi = "http://localhost:3001/";
        const urlFinal = urlApi + name ;
        await fetch(urlFinal, {
            method: 'DELETE',
            headers: {
                'Content-Type' : 'application/json; charset=utf-8',
                'authorization': `Bearer ${token}`
            },
            body : JSON.stringify({
                id: id
            })
        }).then(res => {
            res.status === 204 ? window.alert('L\'element a bien ete supprimé') : window.alert(`Un problème est survenue lors de la tentative de suppression !`);
        }).catch( error => {
            window.alert("Votre action n'a pas ete execute");
            console.error(error);
        })
    }
}

