/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';

const Pokemon = (props) => {
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;

  useEffect(() => {
    console.log(
      { pokemonId },
    );
  }, [pokemonId]);

  return (
    <>
      <Button variant="contained" onClick={() => history.push('/')}>
        Back to Pokemontcg
      </Button>
    </>
  );
};

export default Pokemon;
