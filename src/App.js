import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import theme from './theme/';
import './theme/baseline.css';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  max-width: 1280px;
  margin: auto;
`;

const Box = styled.div`
  display: flex;
  flex: 1;
  border-radius: 5px;
  background: white;
  height: 100vh
  flex-direction: column;
  white-space: pre-line;
  padding: 5px;
`;

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box>
          <code>
            {`
              À l’aide de l’API github, vous devrez réaliser une datavisualisation sur les issues du repository microsoft/vscode, à partir d’une base de projet (https://github.com/Askmona/test_front) que nous vous aurons fourni.
              Voici la consigne :
              Vous devrez afficher un graphique ligne permettant de suivre l’évolution du nombre d’issues actives dans le temps (Bonus: Ajout de date picker permettant de visualiser les données sur une période sélectionnée). Pour ce faire vous devrez utiliser la librairie chartjs.org
                
              Vous aurez carte blanche sur le design du projet. Une fois terminé vous devrez héberger votre réalisation sur un repository github et nous envoyer son lien. Toute fonctionnalité supplémentaire est la bienvenue. Nous vous laissons une semaine pour nous renvoyer le test.
                
              PS: Voici une liste de lien pour chartjs qui vous aideront à appréhender la librairie plus rapidement :
              https://www.chartjs.org/docs/latest/getting-started/usage.html
              https://www.chartjs.org/docs/latest/charts/line.html
              https://www.chartjs.org/docs/latest/axes/cartesian/time.html
              
              De plus vous rencontrerez surement des limitations sur l’api github, nous vous invitons à être ingénieux quant à la mise en cache des données en local.
              Bonne chance !
            `}
          </code>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
