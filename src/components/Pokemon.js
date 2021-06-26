/* eslint-disable react/prop-types */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import {
  Button, Card, CardMedia, CardContent, CircularProgress, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles(() => ({
  pokemontcgContainer: {
    paddingTop: '20px',
    paddingLeft: '50px',
    paddingRight: '50px',
  },
  cardMedia: {
    margin: 'auto',
  },
  cardContent: {
    textAlign: 'center',
  },
}));

const Pokemon = (props) => {
  const classes = useStyles();
  const { match, history } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [image, setImage] = useState('');
  const [namePokemon, setNamePokemon] = useState('');
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios
      .get(`https://api.pokemontcg.io/v1/cards/${pokemonId}/`)
      .then((response) => {
        const { data } = response;
        setImage(data.card.imageUrl);
        setNamePokemon(data.card.name);
      })
      .catch((error) => {
        console.log(error);
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemon = (poke) => {
    const { imageUrl } = poke;
    return (
      <>
        <Card>
          <CardMedia
            className={classes.cardMedia}
            image={image}
            style={{ width: '220px', height: '270px' }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${namePokemon}`}</Typography>
          </CardContent>
        </Card>
        {imageUrl}
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemon(pokemon)}
      {pokemon === false && <Typography> Pokemon not found</Typography>}

      {pokemon !== undefined && (
        <Button variant="contained" onClick={() => history.push('/')}>
          Back to Pokemontcg
        </Button>
      )}
    </>
  );
};

export default Pokemon;
