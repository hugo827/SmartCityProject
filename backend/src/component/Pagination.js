import React from 'react';


const Pagination = ({totalRecord, nbElemPerPage, table}) => {

    const pageNumber = [];

    for(let i = 1; i <= Math.ceil(totalRecord / nbElemPerPage); i++) {
        pageNumber.push(i);
    }


    return (
        <div>
            { pageNumber.map( nb => <button className="li-pagination" key={nb} onClick={ () => console.log(nb)}>{nb}</button>)}
        </div>
    )
}

export  default Pagination;
