import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import RecipeList from 'components/RecipeList';
import Basket from 'components/Basket';

import {RECIPES_LIST_VIEW, BASKET_VIEW} from 'consts';

const viewComponentClassMap = {
  [RECIPES_LIST_VIEW]: RecipeList,
  [BASKET_VIEW]: Basket,
}

@inject('viewStore')
@observer
class Content extends Component {
  render(){
    const {currentViewName} = this.props.viewStore;

    const ComponentClass = viewComponentClassMap[currentViewName];

    if(!ComponentClass)
      return null;

    return <ComponentClass />;
  }
}

export default Content;

