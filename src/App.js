import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import theme from './theme/';
import './theme/baseline.css';

import {
  Container,
  Box,
  Header,
  Title,
  Nav,
  Menu
} from './theme/StyledComponents';

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
            <Nav>
              <Menu>
                <Link
                  to={'/'}
                  className="link dim dark-gray tc f5 db dib mr3 pb2"
                >
                  <i className="far fa-chart-bar" /> Labels{' '}
                </Link>

                <Link
                  to={'/activeissues'}
                  className="link dim dark-gray tc f5 db dib mr3 pb2"
                >
                  <i className="fas fa-chart-area" /> Active Issues{' '}
                </Link>

                <Link
                  to={'/authors'}
                  className="link dim dark-gray tc f5 db dib mr3"
                >
                  <i className="fas fa-users" /> Authors{' '}
                </Link>
              </Menu>
            </Nav>
            <hr />

            <Switch>
              <Route exact path="/" component={Labels} />
              <Route path="/activeissues" component={ActiveIssues} />
              <Route path="/authors" component={Authors} />
            </Switch>
          </Router>
          <p className="flex flex-column tj pa2">
            {`
              À l’aide de l’API github, vous devrez réaliser une datavisualisation sur les issues du repository microsoft/vscode, à partir d’une base de projet (https://github.com/Askmona/`}
            <div className="responsive-display-320">{` `}</div>
            {`test_front) que nous vous aurons fourni.
              Voici la consigne :
              Vous devrez afficher un graphique ligne permettant de suivre l’évolution du nombre d’issues actives dans le temps (Bonus: Ajout de date picker permettant de visualiser les données sur une période sélectionnée). Pour ce faire vous devrez utiliser la librairie chartjs.org
                
              Vous aurez carte blanche sur le design du projet. Une fois terminé vous devrez héberger votre réalisation sur un repository github et nous envoyer son lien. Toute fonctionnalité supplémentaire est la bienvenue. Nous vous laissons une semaine pour nous renvoyer le test.
                
              PS: Voici une liste de lien pour chartjs qui vous aideront à appréhender la librairie plus rapidement :

              https://www.chartjs.org/docs/`}
            <div className="responsive-display-320">{` `}</div>
            {`latest/getting-started/usage.html
              https://www.chartjs.org/docs/`}
            <div className="responsive-display-420">{` `}</div>
            {`latest/charts/line.html
              https://www.chartjs.org/docs/`}
            <div className="responsive-display-410">{` `}</div>
            {`latest/axes/cartesian/time.html
              
              
              De plus vous rencontrerez surement des limitations sur l’api github, nous vous invitons à être ingénieux quant à la mise en cache des données en local.
              Bonne chance !
            `}
          </p>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
