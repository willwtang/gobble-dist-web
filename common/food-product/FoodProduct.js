import React, { PropTypes, Component } from 'react';
import fetch from 'isomorphic-fetch';
import MainLayoutContainer from './../main-layout/MainLayoutContainer';
import FoodProductAnalysis from './FoodProductAnalysis';
import ReviewEntry from './ReviewEntry';

class FoodProduct extends Component {

  componentWillMount() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    fetch('http://localhost:4569/product/getRecommendation', {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify({ upc: this.props.upc }),
      headers,
    })
    .then((res) => res.json())
    .catch((err) => console.log('Analysis and recommendation is not ready: ', err))
    .then((data) => {
      this.props.getProductAnalysis(data);
      this.props.getCategoryComparison(
        Object.keys(data)[0] !== 'basicInfo' ?
        Object.keys(data)[0] :
        Object.keys(data)[1]
      );
    })
    .catch((err) => console.log(err));

    fetch(`http://localhost:4569/product/getReviews?upc=${this.props.upc}`, {
      method: 'GET',
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))
    .then((data) => {
      this.props.getReviews(data);
    })
    .catch((err) => console.log(err));
  }

  render() {
    const name = Object.keys(this.props.productAnalysis).length === 0 ? null :
      <h1>{this.props.productAnalysis.basicInfo.name}</h1>;
    const image = Object.keys(this.props.productAnalysis).length === 0 ? null :
      <img
        role="presentation"
        src={this.props.productAnalysis.basicInfo.image}
        width="300"
        height="300"
        style={{ marginBottom: 30 }}
      />;
    const stars = [];
    for (let i = 0; i < this.props.reviews.reduce((sum, review) => sum + review.rating, 0) / this.props.reviews.length; i ++) {
      stars.push(<div key={i} className={'fa fa-star'} />);
    }
    return (
      <MainLayoutContainer>
        {name}
        {image}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around' }}>
          {this.props.reviews.length === 0 ? null :
            <div>
              <h3 style={{ marginBottom: 30 }}>Overall rating: {stars}</h3>
              {this.props.reviews.map((review) =>
                <ReviewEntry
                  key={review.postId}
                  review={review}
                />)}
            </div>}
          {Object.keys(this.props.productAnalysis).length === 0 ? null :
            <div>
              <FoodProductAnalysis
                facebookId={this.props.facebookId}
                upc={this.props.upc}
                productAnalysis={this.props.productAnalysis}
                getCategoryComparison={this.props.getCategoryComparison}
                categoryComparison={this.props.categoryComparison}
                showProductDetails={this.props.showProductDetails}
                selectedProduct={this.props.selectedProduct}
                getRandomRecommendations={this.props.getRandomRecommendations}
                recommendationsStorage={this.props.recommendationsStorage}
                addedWish={this.props.addedWish}
                addToWish={this.props.addToWish}
              />
            </div>}
        </div>
      </MainLayoutContainer>
    );
  }
}

FoodProduct.propTypes = {
  upc: PropTypes.string.isRequired,
  reviews: PropTypes.array.isRequired,
  getReviews: PropTypes.func.isRequired,
  getProductAnalysis: PropTypes.func.isRequired,
  productAnalysis: PropTypes.object.isRequired,
  getCategoryComparison: PropTypes.func.isRequired,
  categoryComparison: PropTypes.string.isRequired,
  showProductDetails: PropTypes.func.isRequired,
  selectedProduct: PropTypes.number.isRequired,
  getRandomRecommendations: PropTypes.func.isRequired,
  recommendationsStorage: PropTypes.object.isRequired,
  addedWish: PropTypes.string.isRequired,
  addToWish: PropTypes.func.isRequired,
};

export default FoodProduct;
