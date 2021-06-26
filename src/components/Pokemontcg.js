/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Grid, Card, CardMedia, CardContent, CircularProgress, Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { FormControl } from 'react-bootstrap';
import axios from 'axios';
import { toFirstCharUppercase } from './Constant';

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
const Pokemontcg = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState([]);
  const [filter, setFilter] = useState('');

  const handleKeyDown = (e) => {
    setFilter(e.target.value.toLowerCase());
  };

  useEffect(() => {
    axios.get('https://api.pokemontcg.io/v1/cards')
      .then((response) => {
        const { data } = response;
        const pokeData = {};
        data.cards.forEach((pokemon, index) => {
          pokeData[index + 1] = {
            id: index + 1,
            name: pokemon.name.toLowerCase(),
            pokemonImage: pokemon.imageUrl,
            pokeId: pokemon.id,
          };
        });
        setPokemonData(pokeData);
      });
  }, []);

  const getPokemonCard = (pokemonId) => {
    const {
      id, pokeId, name, pokemonImage,
    } = pokemonData[pokemonId];
    return (
      <Grid item xs={2} key={pokemonId}>
        <Card onClick={() => history.push(`/${pokeId}`)}>
          <CardMedia
            className={classes.cardMedia}
            image={pokemonImage}
            style={{ width: '120px', height: '170px' }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <FormControl
        size="lg"
        type="text"
        placeholder="Enter pokemon"
        className="mr-sm-2"
        onChange={handleKeyDown}
      />
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokemontcgContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) => pokemonData[pokemonId].name.includes(filter)
                && getPokemonCard(pokemonId),
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokemontcg;
