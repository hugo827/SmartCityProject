import React from 'react';


const Pagination = ({totalRecord, nbElemPerPage}) => {

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalRecord / nbElemPerPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div>
                { pageNumber.map( nb => <a href="!#" onClick={ () => console.log(nb) }><button className="li-pagination" key={nb} >{nb}</button></a>)}
        </div>

    )
}

export  default Pagination;
