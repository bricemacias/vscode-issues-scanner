import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme/';
import './theme/baseline.css';

import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

import { Container, Box, Header, Title } from './theme/StyledComponents';

import Navigation from './Components/Layout/Navigation';

const Labels = React.lazy(() => import('./Components/Labels'));
const ActiveIssues = React.lazy(() => import('./Components/ActiveIssues'));
const Authors = React.lazy(() => import('./Components/Authors'));

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

            <Suspense fallback={<div>Loading...</div>}>
              <Switch>
                <Route exact path="/" component={Labels} />
                <Route path="/activeissues" component={ActiveIssues} />
                <Route path="/authors" component={Authors} />
              </Switch>
            </Suspense>
          </Router>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
