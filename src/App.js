import React from 'react';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuuilder/BurgerBuilder';

const App = () => (
  <div>
    <Layout>
      <BurgerBuilder />
    </Layout>
  </div>
);

export default App;
