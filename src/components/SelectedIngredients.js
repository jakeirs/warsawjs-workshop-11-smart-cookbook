import React, {Component} from 'react';

import {observer, inject} from 'mobx-react';
import { List, Icon } from 'semantic-ui-react';

import autobind from 'autobind-decorator';

@inject('recipesStore')
@observer
class SelectedIngredients extends Component {

  get ingredients(){
    return this.props.recipesStore.selectedIngredients;
  }

  @autobind
  handleDeleteButtonClick(ev){
    const {ingredient} = ev.currentTarget.dataset;
    this.props.recipesStore.unselectIngredient(ingredient);
  }

  render() {
    return (
      <List animated verticalAlign="middle" divided relaxed={'very'}>
        {this.ingredients.map(item => (
          <List.Item key={item}>
            <List.Content floated="right">
              <Icon link name="delete" data-ingredient={item} onClick={this.handleDeleteButtonClick} />
            </List.Content>
            <List.Content>{item}</List.Content>
          </List.Item>
        ))}
      </List>
    );
  }
}

export default SelectedIngredients;
