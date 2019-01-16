import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Posts from './components/Posts/Posts';
import store from './store/store';
import Header from './common/Header/Header';
import Footer from './common/Footer/Footer';
import './main.scss';

const App = () => (
  <div className="page__wrapper">
    <Header label="React app" />
    <main className="page__body">
      <Provider store={store}>
        <Posts />
      </Provider>
    </main>
    <Footer label={`@${new Date().getFullYear()}`} />
  </div>
);

ReactDOM.render(<App />, document.getElementById('root'));
