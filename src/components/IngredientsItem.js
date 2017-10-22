import React, {Component} from 'react';

import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import { Label, Icon } from 'semantic-ui-react';

import autobind from 'autobind-decorator';

@inject('recipesStore')
@observer
class IngredientsItem extends Component {

  @autobind
  handleClick(){
    if(this.isSelected){
      this.props.recipesStore.unselectIngredient(this.props.name);
    } else {
      this.props.recipesStore.selectIngredient(this.props.name);
    }
  }

  @computed
  get isSelected(){
    return this.props.recipesStore.selectedIngredients.includes(this.props.name);
  }

  render(){
    return(
      <Label
        color={this.isSelected ? 'green' : undefined}
        onClick={this.handleClick}
        basic
        as="a"
      >
        {this.isSelected && <Icon name="checkmark" />}
        {this.props.name}
      </Label>
    );
  }
}

export default IngredientsItem;
