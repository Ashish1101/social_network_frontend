import React from "react";
import {
	ApolloClient,
	InMemoryCache,
	ApolloProvider,
	createHttpLink,
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { persistCache, LocalStorageWrapper } from 'apollo3-cache-persist';
import PrivateRoute from './Components/Layout/PrivateRoute'
import Navbar from "./Components/Layout/Navbar";
import Main from "./Components/Layout/Main";
import Dashboard from './Components/Screen/Dashboard'
import {ThemeProvider } from './Context/ThemeContext'

const httpLink = createHttpLink({
	// uri: "https://social-network-graphql.azurewebsites.net/graphql",
	  uri:"http://localhost:5000/graphql"
});

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem("token");
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : "",
		},
	};
});

 persistCache({
	cache,
	storage: new LocalStorageWrapper(window.localStorage)
  }).then((result) => {
      console.log('storage persisted')
  }).catch(err => console.log('err' , err))

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: cache,
	connectToDevTools: true,
});



function App() {
	const token = localStorage.getItem('token')
	
	return (
		<ApolloProvider client={client}>
			<ThemeProvider>
			<Router>
				<Navbar />
				<Switch>
					{/* {token && <Redirect from="/" to="/dashboard" />} */}
					<Route exact path='/' component={Main} />
					<PrivateRoute exact path="/dashboard" component={Dashboard} />
				</Switch>
			</Router>
			</ThemeProvider>
		</ApolloProvider>
	);
}

export default App;
