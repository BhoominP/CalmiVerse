import React, { useState } from "react";
import { UserPlus, Trash2, Save } from "lucide-react";
import "../styles/SOSCircle.css";

function SOSCircle() {
  const [contacts, setContacts] = useState([
    { id: 1, name: "Jane Doe", contact: "jane.doe@example.com" },
    { id: 2, name: "John Smith", contact: "+1234567890" },
  ]);

  const [newContact, setNewContact] = useState({ name: "", contact: "" });
  const [isAdding, setIsAdding] = useState(false);

  const handleDelete = (id) => {
    setContacts(contacts.filter((c) => c.id !== id));
  };

  const handleSave = () => {
    if (newContact.name && newContact.contact) {
      setContacts([
        ...contacts,
        { id: Date.now(), name: newContact.name, contact: newContact.contact },
      ]);
      setNewContact({ name: "", contact: "" });
      setIsAdding(false);
    }
  };

  return (
    <div className="sos-container">
      <h1 className="sos-title">SOS Circle</h1>
      <p className="sos-subtitle">
        Manage your trusted contacts for emergencies.
      </p>

      <div className="sos-card">
        <h2 className="sos-heading">Your Trusted Contacts</h2>

        {/* Contact List */}
        <div className="sos-list">
          {contacts.map((c) => (
            <div key={c.id} className="sos-contact">
              <div className="sos-contact-info">
                <div>
                  <label>Name</label>
                  <input type="text" value={c.name} disabled />
                </div>
                <div>
                  <label>Email or Phone</label>
                  <input type="text" value={c.contact} disabled />
                </div>
              </div>
              <button
                className="delete-btn"
                onClick={() => handleDelete(c.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}

          {/* New Contact Card */}
          {isAdding && (
            <div className="sos-contact new-contact">
              <div className="sos-contact-info">
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    placeholder="Enter name"
                    value={newContact.name}
                    onChange={(e) =>
                      setNewContact({ ...newContact, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label>Email or Phone</label>
                  <input
                    type="text"
                    placeholder="Enter email or phone"
                    value={newContact.contact}
                    onChange={(e) =>
                      setNewContact({ ...newContact, contact: e.target.value })
                    }
                  />
                </div>
              </div>
              <button className="save-btn" onClick={handleSave}>
                <Save size={18} />
              </button>
            </div>
          )}
        </div>

        <hr className="divider" />

        {/* Add New Contact Button */}
        <button className="add-btn" onClick={() => setIsAdding(true)}>
          <UserPlus size={18} />
          <span>Add New Contact</span>
        </button>
      </div>
    </div>
  );
}

export default SOSCircle;
