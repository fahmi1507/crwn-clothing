import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './collections-overview.scss';
import React from 'react'
import CollectionPreview from '../collection-preview/CollectionPreview';
import { selectCollectionForPreview } from '../../redux/shop/shop-selectors';

const CollectionOverview = ({ collections }) => {
  return (
    <div className='collections-overview'>
        {
            collections.map(({ id, ...otherCollectionProp }) => {
                return <CollectionPreview key={id} {...otherCollectionProp} />
            })
        }
    </div>
  )
}

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionForPreview,
})


export default connect(mapStateToProps)(CollectionOverview);