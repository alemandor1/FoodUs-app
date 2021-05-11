import React from "react";
import { v4 as uuidv4 } from "uuid";
import Recipe from "./recipe/Recipe";
import { Text, SearchBar, View } from 'react-native';
import axios from "axios";

export default class Main_copy extends React.Component {
  state = {
    query: '',
    recipes: [],
    alert: ''
  };

  async componentDidMount() {
    const APP_ID = "dd07cbba";
    const APP_KEY = "37f9e7ae6f5fee59605781496e2645b7";
    const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    if (query !== "") {
        const result = await Axios.get(url);
        if (!result.data.more) {
            return this.setState({alert: "No existe receta con ese nombre"});
        }
        console.log(result);
        this.setState({recipes: result.data.hits, query: "", alert: ""});
    } else {
        this.setState({alert: "Por favor, rellene el formulario"});
    }
  }  

  updateSearch = (query) => {
    this.setState({ query });
  };

  render() {
    const { query } = this.state;

    return (
        <View>
            <Text h1>FoodUS</Text>
            <SearchBar
                placeholder="Busca una receta"
                onChangeText={this.updateSearch}
                value={query}
            />
            <View>
            {recipes !== [] &&
                recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
            </View>
        </View>
    );
  }
  
}
