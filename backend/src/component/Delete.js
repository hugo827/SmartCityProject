
export default function Delete(name, id) {
    let valid = window.confirm(" !!!! Vous allez SUPPRIMER un record !!!!\n Vous ne pourrez pas revenir en arriere !");
    if(valid) {
        const urlApi = "http://localhost:3001/";
        const urlFinal = urlApi + name ;
        fetch(urlFinal, {
            method: 'DELETE',
            body : {id: id}
        }).then(res => {
            res.json().then(response => { console.warn(response)})
        })
    }
}

