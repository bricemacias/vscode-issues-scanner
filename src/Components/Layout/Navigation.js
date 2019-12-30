import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, Menu } from '../../theme/StyledComponents';

const Navigation = () => {
  return (
    <div>
      <Nav>
        <Menu>
          <Link to={'/'} className="link dim dark-gray tc f5 db dib mr3 pb2">
            <i className="far fa-chart-bar" /> Labels{' '}
          </Link>

          <Link
            to={'/activeissues'}
            className="link dim dark-gray tc f5 db dib mr3 pb2"
          >
            <i className="fas fa-chart-area" /> Active Issues{' '}
          </Link>

          <Link to={'/authors'} className="link dim dark-gray tc f5 db dib mr3">
            <i className="fas fa-users" /> Authors{' '}
          </Link>
        </Menu>
      </Nav>
    </div>
  );
};

export default Navigation;
