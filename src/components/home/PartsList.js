import React from 'react';
import PartCard from '../parts/PartCard';
import {useSelector} from 'react-redux';
import {useFirestoreConnect, isLoaded} from 'react-redux-firebase';
import {Link} from 'react-router-dom';

function PartsList(){

  useFirestoreConnect([
    {collection: 'parts'}
  ])
  const parts = useSelector(state => state.firestore.ordered.parts);

  const partsListStyle = {
    marginTop: '50px',
    marginBottom: '50px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr 1fr',
    gap: '30px'
  }
  const sectionStyle={
    backgroundColor: '#F5F5F5',
    height: '100px',
    paddingLeft: '20px',
    paddingTop: '10px',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
  }
  const buttonSection={
    paddingLeft: '350px',
    paddingTop: '25px'
  }

  const partCard = (part) => {
    return (<PartCard
      name = {part.name}
      brand = {part.brand}
      price = {part.price}
      category = {part.category}
      availability = {part.availability}
      quantity = {part.quantity}
      details = {part.details}
      imageUrl = {part.imageUrl}
      id = {part.id}
      key = {part.id}
    />
    )
  }

  if (isLoaded(parts)){
    const newParts = parts.slice(0, 4);
    return(
      <React.Fragment>
        <div style={sectionStyle}>
          <div>
           <h2>Bike Parts</h2>
          </div>
          <div style={buttonSection}>
            <Link to='/parts'>
              <button className="btn btn-default">See More</button>
            </Link>
          </div>
        </div>
        <div style={partsListStyle}>
          {newParts.map(part => partCard(part))}
        </div>
      </React.Fragment>
    )
  }
  else {
    return (
      <React.Fragment>
        <h3>Loading...</h3>
      </React.Fragment>
    )
  }
}

export default PartsList;