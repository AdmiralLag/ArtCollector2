import React, { Fragment } from 'react';

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from '../api';

/**
 * We need a new component called Searchable which:
 * 
 * Has a template like this:
 * 
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 * 
 * When someone clicks the anchor tag, you should:
 * 
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 * 
 * Then start a try/catch/finally block:
 * 
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch: 
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
    const { searchTerm, searchValue, setIsLoading, setSearchResults} = props
    return (
        <span className="content">
        <a href="#" onClick={async (event) => {
            event.preventDefault();
            setIsLoading(true);
            try {
                const results = await fetchQueryResultsFromTermAndValue(searchTerm, searchValue);
                setSearchResults(results);
                } catch (error) {
                console.error(error);
                } finally {
                setIsLoading(false);
                }
        }}>{searchValue}</a>
        </span>
    )
}


const Feature = (props) => {
  const { featuredResult } = props;

  if (!featuredResult) {
    return <main id="feature"></main>;
  }

  const {
    title,
    dated,
    images,
    primaryimageurl,
    description,
    culture,
    style,
    technique,
    medium,
    dimensions,
    people,
    department,
    division,
    contact,
    creditline,
  } = featuredResult;

  const searchableProps = { ...props, isSearchable: true };

  return (
    <main id="feature">
      <div className="object-feature">
        <header>
          <h3>{title}</h3>
          <h4>{dated}</h4>
        </header>
        <section className="facts">
          {description && (
            <Fragment>
              <span className="title">Description</span>
              <span className="content">{description}</span>
            </Fragment>
          )}
          {culture && (
            <Fragment>
              <span className="title">Culture</span>
              <span className="content">
                <Searchable
                  searchTerm="culture"
                  searchValue={culture}
                  {...searchableProps}
                />
              </span>
            </Fragment>
          )}
          {style && (
            <Fragment>
              <span className="title">Style</span>
              <span className="content">{style}</span>
            </Fragment>
          )}
          {technique && (
            <Fragment>
              <span className="title">Technique</span>
              <span className="content">
                <Searchable
                  searchTerm="technique"
                  searchValue={technique}
                  {...searchableProps}
                />
              </span>
            </Fragment>
          )}
          {medium && (
            <Fragment>
              <span className="title">Medium</span>
              <span className="content">
                <Searchable
                  searchTerm="medium"
                  searchValue={medium.toLowerCase()}
                  {...searchableProps}
                />
              </span>
            </Fragment>
          )}
          {dimensions && (
            <Fragment>
              <span className="title">Dimensions</span>
              <span className="content">{dimensions}</span>
            </Fragment>
          )}
          {people && (
            <Fragment>
              <span className="title">People</span>
              <span className="content">
                {people.map((person) => (
                  <Searchable
                    key={person.personid}
                    searchTerm="person"
                    searchValue={person.displayname}
                    {...searchableProps}
                  />
                ))}
              </span>
            </Fragment>
          )}
          {department && (
            <Fragment>
              <span className="title">Department</span>
              <span className="content">{department}</span>
            </Fragment>
          )}
          {division && (
            <Fragment>
              <span className="title">Division</span>
              <span className="content">{division}</span>
            </Fragment>
          )}
          {contact && (
            <Fragment>
              <span className="title">Contact</span>
              <span className="content">{contact}</span>
            </Fragment>
          )}
          {creditline && (
            <Fragment>
              <span className="title">Creditline</span>
              <span className="content">{creditline}</span>
            </Fragment>
          )}
        </section>
        <section className="photos">
          {images && images.map((image) => (
            <img key={image.imageid} src={image.baseimageurl} alt={image.alttext} />
          ))}
        </section>
      </div>
    </main>

  )}

  export default Feature;