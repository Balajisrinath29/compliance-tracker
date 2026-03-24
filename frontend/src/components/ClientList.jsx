import React from 'react';

const ClientList = ({ clients, selectedClient, onSelectClient }) => {
  return (
    <div className="client-list">
      {clients.map((client) => (
        <button
          key={client.id}
          className={`client-item ${selectedClient?.id === client.id ? 'active' : ''}`}
          onClick={() => onSelectClient(client)}
        >
          {client.company_name}
        </button>
      ))}
    </div>
  );
};

export default ClientList;
