import { useEffect, useState } from "react";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/api";

import { isAdmin } from "../services/auth";

import { Navigate } from "react-router-dom";

import "./AdminCategories.css";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [categoryName, setCategoryName] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();

        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    }

    if (isAdmin()) {
      loadCategories();
    }
  }, []);

  // Only Admins can access this page
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }

  function handleChange(event) {
    setCategoryName(event.target.value);
  }

  function resetForm() {
    setCategoryName("");
    setEditingId(null);
  }

  function handleEdit(category) {
    setEditingId(category.categoryId);

    setCategoryName(category.categoryName || "");

    setMessage("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!categoryName.trim()) {
      setError("Please enter a category name.");
      return;
    }

    try {
      if (editingId) {
        await updateCategory(
          editingId,
          {
            categoryId: editingId,
            categoryName: categoryName.trim(),
          },
          token,
        );

        setMessage("Category updated successfully.");

        const data = await getCategories();

        setCategories(data);
      } else {
        const newCategory = await createCategory(
          {
            categoryName: categoryName.trim(),
          },
          token,
        );

        setCategories((current) => [...current, newCategory]);

        setMessage("Category added successfully.");
      }

      resetForm();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteCategory(id, token);

      setCategories((current) =>
        current.filter((category) => category.categoryId !== id),
      );

      setMessage("Category deleted successfully.");

      setError("");
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="admin-categories-page">
      <div className="admin-categories-container">
        <header className="admin-categories-header">
          <span className="admin-badge">Admin</span>

          <h1>Manage Categories</h1>

          <p>Add and manage the categories used to organize your recipes.</p>
        </header>

        {error && <p className="admin-categories-error">{error}</p>}

        {message && <p className="admin-categories-success">{message}</p>}

        <section className="category-form-card">
          <h2>{editingId ? "Edit Category" : "Add New Category"}</h2>

          <form onSubmit={handleSubmit}>
            <label>
              Category Name
              <input
                type="text"
                value={categoryName}
                onChange={handleChange}
                placeholder="e.g. Breakfast"
                required
              />
            </label>

            <div className="category-form-actions">
              <button type="submit" className="save-category-button">
                {editingId ? "Update Category" : "Add Category"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="cancel-category-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="categories-list-section">
          <h2>Existing Categories</h2>

          {categories.length === 0 ? (
            <p className="no-categories">No categories found.</p>
          ) : (
            <div className="categories-list">
              {categories.map((category) => (
                <article className="category-item" key={category.categoryId}>
                  <div className="category-info">
                    <h3>{category.categoryName}</h3>
                  </div>

                  <div className="category-actions">
                    <button
                      className="edit-category-button"
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-category-button"
                      onClick={() => handleDelete(category.categoryId)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default AdminCategories;
