import React from 'react';
import { AsyncStorage, ActivityIndicator,View } from 'react-native';
import Drawer from './src/components/navigator';
import { ApolloProvider } from 'react-apollo';
import makeApolloClient from './src/components/Apollo';
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'

const Main = () => {
  const [client, setClient] = React.useState(null);
  const fetchSession = async () => {
    const client = makeApolloClient();
    setClient(client);
  }
  React.useEffect(() => {
    fetchSession();
  }, [])
  if (!client) {
    return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <ActivityIndicator animating={true} size='large' color='#FAB511'/>
   </View>
   )
  }

  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <Drawer />
      </ApolloHooksProvider>
    </ApolloProvider>
  );
}
export default Main;