import React from 'react';

const AuthorElement = ({ name, number }) => {
  return (
    <div>
      <p>
        User <strong>{name}</strong> posted <strong>{number}</strong> on this
        repository
      </p>
    </div>
  );
};

export default AuthorElement;
