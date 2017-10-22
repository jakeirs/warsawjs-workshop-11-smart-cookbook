import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer, inject} from 'mobx-react';
import { Item, Label } from 'semantic-ui-react';
import autobind from 'autobind-decorator';

import IngredientsList from 'components/IngredientsList';
import IngredientsSummary from 'components/IngredientsSummary';

@inject('viewStore')
@observer
class Recipe extends Component {
  static propTypes = {
    selected: PropTypes.bool,
    recipe: PropTypes.object,
    viewStore: PropTypes.object,
  }

  static defaultProps = {
    selected: false
  }

  @autobind
  handleBasketClick(){
    this.props.viewStore.navigateBasket(this.props.recipe.id);
  }

  render(){
    const {selected, recipe} = this.props;

    const ingredientsSummaryProps = {
      matchedIngredientsCnt: recipe.matchedIngredientsCnt,
      ingredientsCnt: recipe.ingredients.length
    };

    return (
      <Item>
        <Item.Image src="http://via.placeholder.com/175x175" />
        <Item.Content verticalAlign="middle">
          <Item.Header as="a">{recipe.title}</Item.Header>
          <Item.Meta>
            <IngredientsSummary id={recipe.id} {...ingredientsSummaryProps} />
          </Item.Meta>
          <Item.Description>
            Nam odio orci, hendrerit a arcu at, cursus condimentum quam. Duis
            dictum lacinia tempor. Pellentesque id dolor vel nunc finibus
            accumsan. In sed lorem et erat congue ultricies laoreet non arcu.
          </Item.Description>
          <Item.Extra>
            <IngredientsList ingredients={recipe.ingredients} />
          </Item.Extra>
          <Item.Extra>
            {!selected && (
              <Label
                as="a"
                basic
                color="blue"
                icon="shop"
                content="KUP SKŁADNIKI"
                onClick={this.handleBasketClick}
              />
            )}
          </Item.Extra>
        </Item.Content>
      </Item>
    );
  }
}

export default Recipe;
