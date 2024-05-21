import { useState } from "react";
import styles from "./Products.module.css";
import { useEffect } from "react";
import Product from "../Product/Product";
import {
  createProduct,
  deleteProduct,
  getAllItems,
  getProduct,
  updateProduct,
} from "../apis-axios";

const initialFormState = {
  title: "",
  image: "",
  price: "",
  qty: 0,
};

const Products = () => {
  const [prods, setProds] = useState([]);

  const [formOpen, setFromOpen] = useState(false);

  const [formState, setFromState] = useState(initialFormState);

  const [editId, setEditId] = useState(null);

  const handleForm = () => {
    if (formOpen) {
      setFromOpen(false);
    } else {
      setFromOpen(true);
    }
  };

  const loadEditProd = async (itemId) => {
    setEditId(itemId);

    const item = await getProduct(itemId);

    setFromState(item);
    handleForm();
  };
  const loadProds = async () => {
    const data = await getAllItems();

    setProds(data);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFromState({
      ...formState,
      [name]: value,
    });
  };

  const createNewProd = async () => {
    const newProd = await createProduct(formState);

    setProds([...prods, newProd]);
  };

  const editProduct = async () => {
    const newProduct = await updateProduct(formState, editId);

    const index = prods.findIndex((pd) => pd.id === editId);

    const tempProds = [...prods];

    tempProds[index] = newProduct;

    setProds(tempProds);

    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      editProduct();
    } else {
      createNewProd();
    }
    handleForm();
    setFromState(initialFormState);
  };

  const removeProduct = async (itemId) => {
    await deleteProduct(itemId);

    setProds(prods.filter((pd) => pd.id !== itemId));
  };

  useEffect(() => {
    loadProds();
  }, []);

  return (
    <>
      <div>
        <h1
          style={{
            textAlign: "center",
            border: "1px solid",
            padding: "10px",
            width: "100%",
            backgroundColor: "gray",
            color: "white",
          }}
        >
          Welcome to Amazing Shopping!!!
        </h1>
      </div>
      <div className={styles.container}>
        <button className={styles["add-close-btn"]} onClick={handleForm}>
          +
        </button>
        {prods.map((pd) => (
          <Product
            {...pd}
            key={pd.id}
            removeProduct={removeProduct}
            loadEditProd={loadEditProd}
          />
        ))}
        {formOpen && (
          <div className={styles.overlay}>
            <button className={styles["add-close-btn"]} onClick={handleForm}>
              X
            </button>
            <form onSubmit={handleSubmit}>
              <input
                placeholder="Title"
                type="text"
                name="title"
                value={formState.title}
                onChange={handleFormChange}
              />
              <input
                placeholder="Price"
                type="text"
                name="price"
                value={formState.price}
                onChange={handleFormChange}
              />
              <input
                placeholder="Quantity"
                type="number"
                name="qty"
                value={formState.qty}
                onChange={handleFormChange}
              />
              <input
                placeholder="Image URL"
                type="url"
                name="image"
                value={formState.image}
                onChange={handleFormChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
