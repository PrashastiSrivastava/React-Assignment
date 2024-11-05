// Board.js
import React from 'react';
import Ticket from './Ticket';
import { assets } from "./assets/assests";
import './Board.css';

const groupTickets = (tickets, groupBy) => {
  const grouped = {};
  if (!Array.isArray(tickets)) return grouped;
  tickets.forEach(ticket => {
    const groupKey = ticket[groupBy];
    if (!grouped[groupKey]) {
      grouped[groupKey] = [];
    }
    grouped[groupKey].push(ticket);
  });
  return grouped;
};

const Board = ({ tickets, users, groupBy, sortBy }) => {
  const groupedTickets = groupTickets(tickets, groupBy);

  // Create a map of userId to userName
  const userMap = users.reduce((map, user) => {
    map[user.id] = user.name;
    return map;
  }, {});

  return (
    <div className="board">
      {Object.keys(groupedTickets).length === 0 ? (
        <p>No tickets available</p>
      ) : (
        Object.keys(groupedTickets).map(groupKey => {
          const imageSrc = {
            0: assets.Nopriority,
            1: assets.ImgLowPriority,
            2: assets.ImgMediumPriority,
            3: assets.ImgHighPriority,
            4: assets.SVGUrgentPrioritycolour,
            'Todo': assets.Todo,
            'In progress': assets.inprogress,
            'Backlog': assets.Backlog,
          }[groupKey] || assets.defaultImage;

          return (
            <div key={groupKey} className="group">
              <div className="heading">
                <img src={imageSrc} alt="" />
                <h2>
                  {groupBy === 'userId'
                    ? `${userMap[groupKey] || groupKey}` // Use user name instead of userId
                    : {
                        0: "No Priority",
                        1: "Low",
                        2: "Medium",
                        3: "High",
                        4: "Urgent",
                      }[groupKey] || groupKey}
                  <span id="add"> 
                    <img src={assets.add} className="imag" alt=""/>
                    <img src={assets.dotmenu} className="imag" alt=""/>
                  </span>
                </h2>
              </div>
              <div className="tickets">
                {groupedTickets[groupKey]
                  .sort((a, b) =>
                    sortBy === 'priority'
                      ? b.priority - a.priority
                      : a.title.localeCompare(b.title)
                  )
                  .map(ticket => (
                    <Ticket key={ticket.id} ticket={ticket} userName={userMap[ticket.userId]} /> // Pass userName to Ticket
                  ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Board;
