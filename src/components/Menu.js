import React from 'react';
import {inject} from 'mobx-react';
import { Menu } from 'semantic-ui-react';
import { Container } from 'semantic-ui-react';

const Content = inject('viewStore')(props => {
  return (
    <Menu size="large" stackable>
      <Container>
        <Menu.Item header>WarsawJS - SmartCookbook</Menu.Item>
        <Menu.Item as="a" onClick={()=>props.viewStore.navigateRecipesLits()}>
          Lista przepisów
        </Menu.Item>
      </Container>
    </Menu>
  );
});

export default Content;
