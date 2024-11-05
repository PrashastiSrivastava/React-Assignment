import React from 'react';
import './Ticket.css';

const Ticket = ({ ticket }) => {
  const { id, title, priority, userId } = ticket;

  
//   const priorityIcons = ['./ImgHighPriority', ImgLowPriority, ImgMediumPriority, inprogress, Nopriority]; // Represent priority levels with icons
  const priorityIcons = ['⚪', '🟢', '🟠', '🔴', '⚠️']; // Represent priority levels with icons

  
  const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
  const priorityIcon = priorityIcons[priority] || '⚪'; // Default to white circle if undefined

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <img
          src={`https://api.example.com/user-avatar/${userId}`} // Example avatar URL; replace with actual
          alt="User"
          className="user-avatar"
        />
      </div>
      <div className="card-title">{title}</div>
      <div className="card-footer">
        <div className="icon-wrapper">
          <span className="icon">{priorityIcon}</span>
        </div>
        <span className="label">{priorityLabels[priority]}</span>
      </div>
    </div>
  );
};

export default Ticket;
