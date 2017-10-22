import React from 'react';
import { Icon, Header, Table, Button } from 'semantic-ui-react';
import {observer, inject} from 'mobx-react';

import PricesInShop from 'components/PricesInShop';

@inject('shopsStore')
@observer
class IngredientsPrice extends React.Component {
  render() {
    const {shops} = this.props.shopsStore;

    return (
      <div>
        <Header as="h1">Szacowany koszt przygotowania: </Header>
        <Table basic celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Sklep</Table.HeaderCell>
              <Table.HeaderCell>Koszt brakujących składników</Table.HeaderCell>
              <Table.HeaderCell>Łącznie</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {shops.map(shop => <PricesInShop key={shop.id} shop={shop} />)}
          </Table.Body>

          <Table.Footer fullWidth>
            <Table.Row>
              <Table.HeaderCell colSpan="100%">
                <Button
                  icon
                  labelPosition="left"
                  primary
                  size="small"
                  onClick={this.props.shopsStore.refreshPrices}
                >
                  <Icon name="retweet" /> Sprawdź ponownie
                </Button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </div>
    );
  }
}

export default IngredientsPrice;
