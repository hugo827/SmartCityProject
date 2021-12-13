import React from 'react';


const Pagination = ({totalRecord, changeOffset}) => {

    const nbElemPerPage = 2;
    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalRecord / nbElemPerPage); i++) {
        pageNumber.push(i);
    }


    return (
        <div>
            { pageNumber.map( nb => <button className="li-pagination" key={nb} onClick={ () => changeOffset((nb-1)*nbElemPerPage) }> {nb} </button>)}
        </div>
    )
}

export  default Pagination;

