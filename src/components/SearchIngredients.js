import React, {Component} from 'react';

import {computed} from 'mobx';
import {observer, inject} from 'mobx-react';
import { Dropdown } from 'semantic-ui-react';

import autobind from 'autobind-decorator';

@inject('recipesStore')
@observer
class SearchIngredients extends Component {

  @autobind
  handleSelect(e, {value}){
    value = value[0];
    this.props.recipesStore.selectIngredient(value);
  }

  @computed
  get options(){
    return this.props.recipesStore.availableIngedtients.map(
      v => ({key: v, value: v, text: v})
    );
  }

  render(){
    return (
       <Dropdown
        placeholder="Szukaj"
        fluid
        search
        selection
        multiple
        closeOnChange
        value={[]}
        onChange={this.handleSelect}
        options={this.options}
      />
    );
  }
}

export default SearchIngredients;
