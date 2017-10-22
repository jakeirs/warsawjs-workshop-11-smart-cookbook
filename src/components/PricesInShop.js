import React, {Component} from 'react';
import _map from 'lodash/map';
import _values from 'lodash/values';
import _sum from 'lodash/sum';

import {observer, inject} from 'mobx-react';
import { List, Table, Icon } from 'semantic-ui-react';


@inject('shopsStore')
@observer
class IngredientsItem extends Component {

  _renderIngredients(){
    const missingIngredients = this.props.shopsStore.getMissingIngredientsPrices(this.props.shop.id);

    if(!missingIngredients) return null;

    return _map(missingIngredients, (price, ingredient) => (
      <List.Item key={ingredient}>
        <List.Content>
          <span>{ingredient}: </span>
          <strong>{price} zł</strong>
        </List.Content>
      </List.Item>
    ));
  }

  _renderSum(){
    const missingIngredients = this.props.shopsStore.getMissingIngredientsPrices(this.props.shop.id);

    if(!missingIngredients) return <Icon loading name="spinner" />;

    return `${_sum(_values(missingIngredients))} zł`;

  }

  render(){
    const {shop} = this.props;

    return(
      <Table.Row key={shop.id}>
        <Table.Cell collapsing>
          <strong>{shop.name}</strong>
        </Table.Cell>
        <Table.Cell>
          <List divided horizontal>
            {this._renderIngredients()}
          </List>
        </Table.Cell>
        <Table.Cell collapsing>
          {this._renderSum()}
       </Table.Cell>
      </Table.Row>
    );
  }
}

export default IngredientsItem;
