import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress,
    Toolbar,
    AppBar,
    TextField,
  } from "@material-ui/core";

import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./Constant";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    pokedexContainer: {
      paddingTop: "20px",
      paddingLeft: "50px",
      paddingRight: "50px",
    },
    cardMedia: {
      margin: "auto",
    },
    cardContent: {
      textAlign: "center",
    },
    searchContainer: {
      display: "flex",
      backgroundColor: fade(theme.palette.common.white, 0.15),
      paddingLeft: "20px",
      paddingRight: "20px",
      marginTop: "5px",
      marginBottom: "5px",
    },
    searchIcon: {
      alignSelf: "flex-end",
      marginBottom: "5px",
    },
    searchInput: {
      width: "200px",
      margin: "5px",
    },
  }));
  

const Pokemontcg = (props) => {
  const classes = useStyles(); 
  const { history } = props;
  const [pokemonData, setPokemonData] = useState([]);
  const [filter, setFilter] = useState("");

    const _handleKeyDown = (e) => {
        console.log(e.key)
    }

    useEffect(() => {
        axios
        .get(`https://api.pokemontcg.io/v1/cards?subtype=Basic`)
          .then(function (response) {
            const { data } = response;
            const { results } = data;
            const newPokemonData = {};
            const newPokemonData2 = [];
            data.cards.forEach((pokemon, index) => {
                newPokemonData[index + 1] = {
                    id: index + 1,
                    name: pokemon.name,
                    sprite: pokemon.imageUrl
                  };
            });  
            setPokemonData(newPokemonData);
          });
      }, []);


     const getPokemonCard = (pokemonId) => {
        const { id, name, sprite } = pokemonData[pokemonId];
        return (
          <Grid item xs={4} key={pokemonId}>
            <Card onClick={() => history.push(`/${id}`)}>
              <CardMedia
                className={classes.cardMedia}
                image={sprite}
                style={{ width: "130px", height: "130px" }}
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
         <Navbar bg="light" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            </Nav>
            
             <FormControl type="text" placeholder="Ingrese pokemon"
                   className="mr-sm-2" />
           
           </Navbar.Collapse>
        </Navbar>

        <hr />
        {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              pokemonData[pokemonId].name.includes(filter) &&
               getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
       
    </>
    );
}

export default Pokemontcg;