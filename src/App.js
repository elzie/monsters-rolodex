import React, { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import './App.css';
import SearchBox from './components/search-box/search-box.component';

// Functional Components

// A functional component behaves as you would expect a regular javascript function to do.
// There are no life-cycles when it comes to functional components. Functions, pure functions, impure-functions and side-effects.

const App = () => {
  // State
  const [searchField, setSearchField] = useState(''); // [value, setValue]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  useEffect(() => {
    // API Call
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => setMonsters(users));
    console.log('fetch fired');
  }, []);
  // ^^^ when any values inside this dependency-array changes, im going to run the prior call-back-function
  // nothing in the array, makes sure that the fetch-function only runs once.
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {
      //if the name includes the searched value, return true
      // .includes is not case-sensitive, which is why we lowerCase all text typed in
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    // useEffect is used again, to make sure that filteredMonsters does not run everytime the script runs.
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);
  // filter thru monsters either when monsters-array changes - OR when the searchfield changes.

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
};

// a pure function should return the exact same result, every time - when given the same arguments as before.
// a pure function should not produce side-effects.

// const pureFunction = (a, b) => {
//   return a + b
// }
// a = 2, b = 4
// result will always be 6.

// an impure function, changes result - due to the variable 'c' being able to have a changed value.
// let c = 3;
// const funcA = (a, b) => {
//   return a + b + c
// }

// const funcB = (a, b) => {
//   c = a + b;
//   return a * b;
//}
// 'c' will be changed outside of the function, which is considered a side-effect.

// Class Components
// class App extends Component {
//   constructor() {
//     console.log('constructor');
//     // All classes runs the constructor-method before anything else
//     super();
//     // Super calls the constructor-method from any other classes we are extending from
//     this.state = {
//       // key-value pairs
//       monsters: [],
//       searchField: '',
//     };
//   }

//   // Lifecycle-methods
//   componentDidMount() {
//     console.log('componentDidMount');
//     // API Call
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then((response) => response.json())
//       .then((users) =>
//         this.setState(
//           () => {
//             return { monsters: users };
//           },
//           () => {
//             console.log(this.state);
//           }
//         )
//       );
//   }

//   onSearchChange = (e) => {
//     const searchField = e.target.value.toLocaleLowerCase();

//     this.setState(() => {
//       return { searchField };
//     });
//   };

//   render() {
//     console.log('render');

//     // Destructuring and getting rid of 'this.'
//     const { monsters, searchField } = this.state;
//     const { onSearchChange } = this;

//     const filteredMonsters = monsters.filter((monster) => {
//       //if the name includes the searched value, return true
//       // .includes is not case-sensitive, which is why we lowerCase all text typed in
//       return monster.name.toLocaleLowerCase().includes(searchField);
//     });

//     return (
//       <div className="App">
//         <h1 className="app-title">Elzies Monsters Rolodex</h1>

//         <SearchBox
//           onChangeHandler={onSearchChange}
//           placeholder="Search Monsters"
//           className="search-box"
//         />
//         <CardList monsters={filteredMonsters}></CardList>
//       </div>
//     );
//   }
// }

export default App;
