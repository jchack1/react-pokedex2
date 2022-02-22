import React from "react";

//below we are using an if statement to check if we should render the prev and next buttons - if there is a page that we can actually navigate to

export default function Pagination({goToNextPage, goToPrevPage}) {
  return (
    <div className="Pagination">
      {goToPrevPage && (
        <button onClick={goToPrevPage} className="Button">
          Previous
        </button>
      )}
      {goToNextPage && (
        <button onClick={goToNextPage} className="Button">
          Next
        </button>
      )}
    </div>
  );
}
