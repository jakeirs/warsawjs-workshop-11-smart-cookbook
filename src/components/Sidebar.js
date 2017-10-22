import React from 'react';
import { Header } from 'semantic-ui-react';

import SelectedIngredients from 'components/SelectedIngredients';
import SearchIngredients from 'components/SearchIngredients';

const Sidebar = props => {
  return (
    <div>
      <Header as="h3">Posiadane składniki: </Header>
      <SearchIngredients />
      <SelectedIngredients />
    </div>
  );
};

export default Sidebar;
