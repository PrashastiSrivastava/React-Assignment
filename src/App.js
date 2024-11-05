// App.js
import React, { useState, useEffect } from 'react';
import Board from './Board';
import { assets } from "./assets/assests";
import './App.css';

const App = () => {
  const [groupBy, setGroupBy] = useState(localStorage.getItem('groupBy') || 'status');
  const [sortBy, setSortBy] = useState(localStorage.getItem('sortBy') || 'priority');
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  // Fetch data from the API, including both tickets and users
  const fetchTicketsAndUsers = () => {
    setLoading(true);
    setError(null);
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets || []);
        setUsers(data.users || []); // Set the users data here
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch data from the API');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTicketsAndUsers();
  }, []);

  useEffect(() => {
    localStorage.setItem('groupBy', groupBy);
    localStorage.setItem('sortBy', sortBy);
  }, [groupBy, sortBy]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="App">
      <header>
        {/* <div className="display-dropdown">
          <button onClick={toggleDropdown} className="display-button">
            <img src={ assets.Display} id="icon" alt=""/> <span id="icon" >Display</span> <img src={ assets.down } id="icon" alt=""/>
          </button>
          {showDropdown && (
                    <div className="card">
                      <div className="dropdown-menu">
                        <div className="dropdown-item">
                          <label>Grouping</label>
                          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="custom-select" >
                            <option value="status">Status </option>
                            <option value="userId">User</option>
                            <option value="priority">Priority</option>
                          </select>
                        </div>

                        <div className="dropdown-item">
                          <label>Ordering</label>
                          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="custom-select">
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
            </div> */}

            <nav className="navbar">
                {/* Insert dropdown component here */}
                <div className="display-dropdown">
                  <button onClick={toggleDropdown} className="display-button">
                    <img src={assets.Display} alt="icon" id="icon" /> 
                    <span id="icon">Display</span>
                    <img src={assets.down} alt="icon" id="icon" />
                  </button>

                  {showDropdown && (
                    <div className="card-nav">
                      <div className="dropdown-menu">
                        <div className="dropdown-item">
                          <label>Grouping</label>
                          <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="custom-select">
                            <option value="status">Status</option>
                            <option value="userId">User</option>
                            <option value="priority">Priority</option>
                          </select>
                        </div>

                        <div className="dropdown-item">
                          <label>Ordering</label>
                          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="custom-select">
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </nav>
          </header>

          {error && (
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchTicketsAndUsers}>Retry</button>
        </div>
      )}

      <Board tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;