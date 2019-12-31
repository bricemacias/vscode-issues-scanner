import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 120%;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-left: 32px;
  padding-right: 32px;
  max-width: 1280px;
  margin: auto;
  margin-top: 3%;
  margin-bottom: 0;
`;

export const Box = styled.div`
  display: flex;
  flex: 1;
  border-radius: 5px;
  justify-content: center;
  background: white;
  width: 100%
  flex-direction: column;
  white-space: pre-line;
  padding: 5px;
  text-wrap: avoid;
  margin-bottom: 2%;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  background: no-repeat center center;
  background-size: 100% 100%;
  background-color: black;
  color: white;
  margin: 0;
  margin-bottom: 2px;
`;

export const Title = styled.h1.attrs({
  className: 'flex flex-column'
})``;

export const Nav = styled.nav.attrs({
  className: 'dt dt--fixed border-box pa3 ph5-ns bb b--black-10 tc'
})``;

export const Menu = styled.div.attrs({
  className: 'tc flex justify-around',
  id: 'menu'
})``;
