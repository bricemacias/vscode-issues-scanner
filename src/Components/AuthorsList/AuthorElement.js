import React from 'react';

const AuthorElement = ({ name, number }) => {
  return (
    <div>
      <p>
        User <strong>{name}</strong> posted <strong>{number}</strong>{' '}
        {number > 1 ? <strong>issues</strong> : <strong>issue</strong>} on this
        repository
      </p>
    </div>
  );
};

export default AuthorElement;
