import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme/';
import './theme/baseline.css';

import { Container, Box, Header, Title } from './theme/StyledComponents';

import Navigation from './Components/Layout/Navigation';

import Labels from './Components/Labels';
import ActiveIssues from './Components/ActiveIssues';
import Authors from './Components/Authors';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box>
          <Router>
            <Header>
              <Title>Visual Studio Code Issues Scanner</Title>
            </Header>
            <Navigation />
            <hr />

            <Switch>
              <Route exact path="/" component={Labels} />
              <Route path="/activeissues" component={ActiveIssues} />
              <Route path="/authors" component={Authors} />
            </Switch>
          </Router>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
