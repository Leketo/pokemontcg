import React, { useEffect, useState } from "react";
import axios from "axios";




const Search = (props) => {
    const { match, history } = props;
   // const { params } = match;
  //  const { pokemonId } = params;
  //  const [pokemon, setPokemon] = useState(undefined);

    const _handleKeyDown = (e) => {
        console.log(e.key)
    }

    useEffect(() => {
        axios   
        .get(`https://api.pokemontcg.io/v1/cards?subtype=Basic?name=${pokemonId}`)
        //  .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
          .then(function (response) {
            const { data } = response;
            setPokemon(data);
          })
          .catch(function (error) {
            setPokemon(false);
          });
      }, [pokemonId]);



    return (
        <>
        <h2>Buscar Pokemon</h2>
        <label>
          Buscar:
          <input type="text" onKeyDown={_handleKeyDown} placeholder="Ingrese pokemon" />
        </label>
      </>
    );
}


export default Search;