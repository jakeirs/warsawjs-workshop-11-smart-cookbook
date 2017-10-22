import React, {Component} from 'react';

import {observer, inject} from 'mobx-react';
import { Message, Icon } from 'semantic-ui-react';

function withLoadingInfoHocFactory(WrappedComponent){

  @inject('recipesStore')
  @observer
  class HOC extends Component {
    static displayName = getDisplayName(WrappedComponent) + '__withLoading';

    render(){
      const {recipesStore, ...otherProps} = this.props;

      if(recipesStore.loadingRecipes){
        return (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Content>
              <Message.Header>Trawa ładowanie danych</Message.Header>
            </Message.Content>
          </Message>
        );
      }

      return <WrappedComponent {...otherProps} />
    }
  }

  return HOC;
}
//dla reactowych devTools
function getDisplayName(Comp){
  return Comp.displayName || Comp.name || 'WrappedComponent';
}

export default withLoadingInfoHocFactory;
