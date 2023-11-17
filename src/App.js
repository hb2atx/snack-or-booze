import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './styles/App.css';
import Home from './pages/Home';
import FoodMenu from './components/FoodMenu';
import FoodItem from './components/FoodItem';
import AddMenuItemForm from './components/AddMenuItemForm';
import SnackOrBoozeApi from './Api';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const snacksData = await SnackOrBoozeApi.getSnacks();
        const drinksData = await SnackOrBoozeApi.getDrinks();

        setSnacks(snacksData);
        setDrinks(drinksData);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getData();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route exact path="/">
              <Home snackCount={snacks.length} drinkCount={drinks.length} />
            </Route>
            <Route exact path="/snacks">
              <FoodMenu snacks={snacks} type="snacks" title="Snacks" />
            </Route>
            <Route exact path="/drinks">
              <FoodMenu snacks={drinks} type="drinks" title="Drinks" />
            </Route>
            <Route path="/add">
              <AddMenuItemForm snacks={snacks} drinks={drinks} />
            </Route>
            <Route path="/snacks/:id">
              <FoodItem items={snacks} type="snacks" cantFind="/snacks" />
            </Route>
            <Route path="/drinks/:id">
              <FoodItem items={drinks} type="drinks" cantFind="/drinks" />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
