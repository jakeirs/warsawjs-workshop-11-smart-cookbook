import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import {Item, Header, Segment} from 'semantic-ui-react';

import Recipe from 'components/Recipe';
import withLoadingInfoHocFactory from 'withLoadingInfoHocFactory';

@inject('recipesStore')
@observer
class RecipeList extends Component {
  static propTypes = {
    recipesStore: PropTypes.shape({
      sortedRecipesList: PropTypes.array
    })
  }

  _renderListItems(){
    const {recipesStore} = this.props;

    return recipesStore.sortedRecipesList.map(
      recipe => <Recipe key={recipe.id} recipe={recipe} />
    );
  }

  render(){
    return (
      <div>
        <Segment clearing vertical basic>
          <Header floated="left" as="h1">
            Dostępne przepisy:
          </Header>
        </Segment>
        <Item.Group divided>
          {this._renderListItems()}
        </Item.Group>
      </div>
    );
  }
}

export default withLoadingInfoHocFactory(RecipeList);
