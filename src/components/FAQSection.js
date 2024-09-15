import React, { useState } from 'react';
import FAQCard from './FAQCard';
import '../componentCss/FAQSection.css'; // For gradient and layout

const initialFaqData = [
  {
    id: 1,
    image: '/images/mango.png', // Replace with actual image path
    title: 'How is Tangerine healthy?',
    description: 'Tangerines are a great health booster due to their high vitamin C content, which supports the immune system and skin health.'
  },
  // ...other initial FAQ items
];

const FAQSection = () => {
  const [faqItems, setFaqItems] = useState(initialFaqData);
  const [showDialog, setShowDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false); // For adding new card
  const [deleteId, setDeleteId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [newItem, setNewItem] = useState({
    id: null,
    image: '',
    title: '',
    description: ''
  });

  // Handling add new card form
  const handleNewChange = (e) => {
    const { name, value } = e.target;
    setNewItem({ ...newItem, [name]: value });
  };

  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem({ ...newItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewSubmit = (e) => {
    e.preventDefault();
    const newId = faqItems.length ? faqItems[faqItems.length - 1].id + 1 : 1;
    const newFaqItem = { ...newItem, id: newId };
    setFaqItems([...faqItems, newFaqItem]);
    setShowAddForm(false); // Close the add form
    setNewItem({ id: null, image: '', title: '', description: '' }); // Reset form
  };

  // Existing delete and edit logic remains the same
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDialog(true);
  };

  const handleConfirmDelete = () => {
    setFaqItems(faqItems.filter(item => item.id !== deleteId));
    setShowDialog(false);
  };

  const handleCancelDelete = () => {
    setShowDialog(false);
  };

  const handleEditClick = (item) => {
    setEditItem(item);
    setShowEditForm(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditItem({ ...editItem, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditItem({ ...editItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setFaqItems(faqItems.map(item => (item.id === editItem.id ? editItem : item)));
    setShowEditForm(false);
  };

  const handleCancelEdit = () => {
    setShowEditForm(false);
  };

  return (
    <div className="faq-section">
      <h2 className="faq-section-title">FAQ Section</h2>
      
      {/* Button to show add form */}
      <button className="add-faq-btn" onClick={() => setShowAddForm(true)}>
        Add New FAQ
      </button>

      {/* Displaying the FAQ cards */}
      <div className="faq-list">
        {faqItems.map((faq) => (
          <FAQCard
            key={faq.id}
            image={faq.image}
            title={faq.title}
            description={faq.description}
            onDelete={() => handleDeleteClick(faq.id)}
            onEdit={() => handleEditClick(faq)}
          />
        ))}
      </div>

      {/* Add new card form */}
      {showAddForm && (
        <div className="edit-form">
          <h3>Add New FAQ Item</h3>
          <form onSubmit={handleNewSubmit}>
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleNewImageChange}
              />
              {newItem.image && <img src={newItem.image} alt="Preview" className="edit-form-image-preview" />}
            </label>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={newItem.title}
                onChange={handleNewChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={newItem.description}
                onChange={handleNewChange}
                required
              />
            </label>
            <button type="submit" className="confirm-btn">Add FAQ</button>
            <button type="button" className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
          </form>
        </div>
      )}

      {/* Existing confirm dialog and edit form logic remains unchanged */}
      {showDialog && (
        <div className="confirm-dialog">
          <p>Are you sure you want to delete this item?</p>
          <button className="confirm-btn" onClick={handleConfirmDelete}>Yes, Delete</button>
          <button className="cancel-btn" onClick={handleCancelDelete}>Cancel</button>
        </div>
      )}

      {showEditForm && (
        <div className="edit-form">
          <h3>Edit FAQ Item</h3>
          <form onSubmit={handleEditSubmit}>
            <label>
              Image:
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {editItem.image && <img src={editItem.image} alt="Preview" className="edit-form-image-preview" />}
            </label>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={editItem.title}
                onChange={handleEditChange}
                required
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={editItem.description}
                onChange={handleEditChange}
                required
              />
            </label>
            <button type="submit" className="confirm-btn">Save Changes</button>
            <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default FAQSection;
