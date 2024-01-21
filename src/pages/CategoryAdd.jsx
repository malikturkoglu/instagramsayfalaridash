import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { setDoc, doc} from 'firebase/firestore';
import { db } from '../firebase';

function AddCategory() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docData = {
      name:category,
    };
  
    try {
      // Set the document with the ID equal to the category
      const docRef = doc(db, 'categories', category); // This creates a reference to a document with the ID equal to the category
      await setDoc(docRef, docData);
      // Reset form or give user feedback
      // ... your code to handle success
    } catch (error) {
      // Handle the error
      console.error("Error setting document: ", error);
      // ... your code to handle errors
    }
    setCategory("");
};

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main>
          <div className="max-w-2xl mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                <label className="block text-sm font-medium mb-1" htmlFor="category">Kategori ismi:</label>
                <input id="category" className="form-input w-full" type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
              </div>


              <button type="submit" className="btn bg-indigo-600 text-white">Add Category</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AddCategory;