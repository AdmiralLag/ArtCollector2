import React from 'react';

/**
 * We need to import fetchQueryResultsFromURL since we will sometimes have urls in info.prev and info.next
 * which are query urls.
 */
import { fetchQueryResultsFromURL } from '../api';

const Preview = (props) => {
  /**
   * Destructure setSearchResults, setFeaturedResult, and setIsLoading from props
   * and also destructure info and records from props.searchResults
   * 
   * You need info, records, setSearchResults, setFeaturedResult, and setIsLoading as available constants
   */
    const { setSearchResults, setFeaturedResult, setIsLoading} = props;
    const { info, records } = props.searchResults ?? {};
    // now you can use `info`, `records`, `setSearchResults`, `setFeaturedResult`, and `setIsLoading` as constants in the Preview component
    // ...
  


  /**
   * Don't touch this function, it's good to go.
   * 
   * It has to be defined inside the Preview component to have access to setIsLoading, setSearchResults, etc...
   */
  async function fetchPage(pageUrl) {
    setIsLoading(true);

    try {
      const results = await fetchQueryResultsFromURL(pageUrl);
      setSearchResults(results);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <aside id="preview">
    <header className="pagination">
      {/* This button should be disabled if nothing is set in info.prev, and should call fetchPage with info.prev when clicked */}
      <button 
        disabled={!info?.prev} 
        className="previous"
        onClick={() => fetchPage(info?.prev)}
        > Previous </button>
      {/* This button should be disabled if nothing is set in info.next, and should call fetchPage with info.next when clicked */}
      <button
          disabled={!info?.next} 
          className="next"
          onClick={() => fetchPage(info?.next)}//use null incase undefined ??
        > Next </button>
    </header>
    <section className="results">
        {records?.map((record, index) => (
          <div
            key={index}
            className="object-preview"
            onClick={(event) => {
              event.preventDefault();
              setFeaturedResult(record);
            }}
          >
            {record.primaryimageurl && (
              <img src={record.primaryimageurl} alt={record.description} />
            )}
            {record.title ? (
              <h3>{record.title}</h3>
            ) : (
              <h3>MISSING INFO</h3>
            )}
          </div>
        ))}
      </section>
    </aside>
  );
};

export default Preview;
