import React from 'react';
import {observer, inject} from 'mobx-react';

import IngredientsPrice from './IngredientsPrice';
import SelectedRecipe from 'components/SelectedRecipe';
import withLoadingInfoHocFactory from 'withLoadingInfoHocFactory';

const Basket = inject('recipesStore')(
  observer(
    ({recipesStore}) => (
      <div>
        <IngredientsPrice recipe={recipesStore.selectedRecipe} />
        <SelectedRecipe recipe={recipesStore.selectedRecipe} />
      </div>
    )
  )
);

export default withLoadingInfoHocFactory(Basket);
