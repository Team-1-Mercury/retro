import React from 'react';
import ProductDetail from './containers/ProductDetail.jsx';
import QuestionsAnswers from './containers/QuestionsAnswers.jsx';
import RatingsReviews from './containers/RatingsReviews.jsx';
import './App.scss';

function App() {
  return (
    <main>
      <ProductDetail />
      <QuestionsAnswers />
      <RatingsReviews />
    </main>
  );
}

export default App;
