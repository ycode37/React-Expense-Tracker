import React, { useState } from "react";

export const ExpenseForm = () => {
  // State for form inputs
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Misc");
  const [editId, setEditId] = useState(null);
  // State for expense list
  const [expenses, setExpenses] = useState(() => {
    const rawExp = localStorage.getItem("storedExpense");
    if (!rawExp) return [];
    return JSON.parse(rawExp);
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (price && description) {
      const newExpense = {
        id: editId ? editId : Date.now(),
        price: parseFloat(price),
        description,
        category,
      };

      if (editId) {
        // Update existing
        const updatedExpenses = expenses.map((expense) =>
          expense.id === editId ? newExpense : expense
        );
        setExpenses(updatedExpenses);
      } else {
        // Add new
        setExpenses([...expenses, newExpense]);
      }

      // Reset form
      setPrice("");
      setDescription("");
      setCategory("Misc");
      setEditId(null);
    }
  };

  const finalPrice = expenses.reduce((acc, val) => acc + val.price, 0);

  const handleDelete = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };
  const handleEdit = (expense) => {
    setPrice(expense.price);
    setDescription(expense.description);
    setCategory(expense.category);
    setEditId(expense.id); // so we know we’re editing, not adding
  };

  localStorage.setItem("storedExpense", JSON.stringify(expenses));
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Expense Tracker</h1>

      {/* Form for adding expenses */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Price ($)</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter amount"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="Misc">Misc</option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Expense
        </button>
      </form>

      {/* Display expense list */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Expenses</h2>
        {expenses.length === 0 ? (
          <p className="text-gray-500">No expenses added yet.</p>
        ) : (
          <ul className="space-y-2">
            {expenses.map((expense) => (
              <li
                key={expense.id}
                className="p-3 border rounded flex justify-between items-center"
              >
                {" "}
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-600">{expense.category}</p>
                </div>
                <p className="font-bold">${expense.price.toFixed(2)}</p>
                <button onClick={() => handleDelete(expense.id)}>Delete</button>
                <button onClick={() => handleEdit(expense)}>Edit</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3>Total Price is ${finalPrice}</h3>
    </div>
  );
};
