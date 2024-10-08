const axios = require("axios");
const { request, response } = require("express");
const { apiUrl } = require('../config/config')

const getPokemonList = (req = request, res = response) => {
  const { limit = 50, page = 1 } = req.query;
  const offset = (page - 1) * limit;
  const filtro = `?limit=${limit}&offset=${offset}`;

  axios
    .get(`${apiUrl}/pokemon${filtro}`) 
    .then((response) => {
      const { data } = response;
      res.status(200).json({
        msg: "Ok",
        data,
      });
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return res.status(404).json({
          msg: "No se encontró el Pokémon con el id proporcionado",
        });
      }
      res.status(500).json({
        msg: "Error en el servidor",
        error,
      });
    });
};

const getid_pokemon = (req = request, res = response) => {
  const { id_pokemon = "" } = req.params; 


  if (!id_pokemon) {
    return res.status(400).json({
      msg: "El parámetro id_pokemon es requerido",
    });
  }


  if (isNaN(id_pokemon)) {
    return res.status(422).json({
      msg: "El parámetro id_pokemon debe ser un número válido",
    });
  }

  console.log(id_pokemon);

  axios
    .get(`${apiUrl}/pokemon/${id_pokemon}`) 
    .then((response) => {
      const { data } = response;
      res.status(200).json({
        msg: "Ok",
        data,
      });
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return res.status(404).json({
          msg: "No se encontró el Pokémon con el id proporcionado",
        });
      }
      res.status(500).json({
        msg: "Error en el servidor",
        error,
      });
    });
};

module.exports = {
  getPokemonList,
  getid_pokemon,
};


