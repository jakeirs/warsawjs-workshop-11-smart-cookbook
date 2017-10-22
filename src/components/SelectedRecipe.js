import React from 'react';
import { Item, Header, Segment } from 'semantic-ui-react';
import Recipe from 'components/Recipe';

const SelectedRecipe = ({recipe}) => {
  return (
    <Segment basic vertical>
      <Header as="h3">Wybrany przepis:</Header>
      <Item.Group>
        <Recipe selected recipe={recipe} />
      </Item.Group>
    </Segment>
  );
};

export default SelectedRecipe;
