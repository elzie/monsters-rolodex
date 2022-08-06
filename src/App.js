import React, { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import './App.css';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    console.log('constructor');
    // All classes runs the constructor-method before anything else
    super();
    // Super calls the constructor-method from any other classes we are extending from
    this.state = {
      // key-value pairs
      monsters: [],
      searchField: '',
    };
  }

  // Lifecycle-methods
  componentDidMount() {
    console.log('componentDidMount');
    // API Call
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) =>
        this.setState(
          () => {
            return { monsters: users };
          },
          () => {
            console.log(this.state);
          }
        )
      );
  }

  onSearchChange = (e) => {
    const searchField = e.target.value.toLocaleLowerCase();

    this.setState(() => {
      return { searchField };
    });
  };

  render() {
    console.log('render');

    // Destructuring and getting rid of 'this.'
    const { monsters, searchField } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {
      //if the name includes the searched value, return true
      // .includes is not case-sensitive, which is why we lowerCase all text typed in
      return monster.name.toLocaleLowerCase().includes(searchField);
    });

    return (
      <div className="App">
        <h1 className="app-title">Elzies Monsters Rolodex</h1>

        <SearchBox
          onChangeHandler={onSearchChange}
          placeholder="Search Monsters"
          className="search-box"
        />
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }
}

export default App;
