import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CircularProgress
  } from "@material-ui/core";

import { fade, makeStyles } from "@material-ui/core/styles";
import { toFirstCharUppercase } from "./Constant";
import { Navbar, Nav, FormControl } from "react-bootstrap";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    pokemontcgContainer: {
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
  }));
  

const Pokemontcg = (props) => {
  const classes = useStyles(); 
  const { history } = props;
  const [pokemonData, setPokemonData] = useState([]);
  const [filter, setFilter] = useState("");

    const _handleKeyDown = (e) => {
       setFilter(e.target.value.toLowerCase())
    }

    useEffect(() => {
        axios.get(`https://api.pokemontcg.io/v1/cards?subtype=Basic`)
          .then(function (response) {
            const { data } = response;
            const { results } = data;
            const pokemonData = {};
            data.cards.forEach((pokemon, index) => {
                pokemonData[index + 1] = {
                    id: index + 1,
                    name: pokemon.name.toLowerCase(),
                    pokemonImage: pokemon.imageUrl
                  };
            });  
            setPokemonData(pokemonData);
          });
      }, []);


     const getPokemonCard = (pokemonId) => {
        const { id, name, pokemonImage } = pokemonData[pokemonId];
        return (
          <Grid item xs={4} key={pokemonId}>
            <Card onClick={() => history.push(`/${id}`)}>
              <CardMedia
                className={classes.cardMedia}
                image={pokemonImage}
                style={{ width: "140px", height: "140px" }}
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
            
             <FormControl type="text" 
                       placeholder="Enter pokemon"
                       className="mr-sm-2" 
                       onChange={_handleKeyDown} />
           
           </Navbar.Collapse>
        </Navbar>

        <hr />

        {pokemonData ? (
        <Grid container spacing={2} className={classes.pokemontcgContainer}>
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