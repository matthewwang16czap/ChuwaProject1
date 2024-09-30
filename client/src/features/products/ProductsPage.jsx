import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { getAllProducts, deleteProduct } from "./productsSlice";
import { getUser } from "../users/usersSlice";
import AddCartComponent from "./AddCartComponent";

// const styles = {
//   body: {
//     width: "100vw",
//     height: "90vh",
//     padding: "20px",
//   },
//   header: {
//     width: "100%",
//     height: "10%",
//     display: "flex",
//     justifyContent: "space-between",
//     padding: "20px",
//     borderBottom: "1px solid #ddd",
//   },
//   left: {
//     margin: 0,
//     fontSize: "50px",
//   },
//   rightButton: {
//     marginLeft: "10px",
//     fontSize: "30px",
//   },
//   productsGrid: {
//     width: "100%",
//     height: "80%",
//     listStyleType: "none",
//   },
//   mainUl: {
//     width: "100%",
//     height: "100%",
//     listStyleType: "none",
//     display: "grid",
//     gridTemplateColumns: "repeat(5, 2fr)",
//     gridTemplateRows: "repeat(2, 50%)",
//     gap: "10px",
//   },
//   mainLi: {
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     width: "20%",
//     height: "45%",
//     border: "1px solid grey",
//     padding: "0px",
//   },
//   mainDiv: {
//     height: "100%",
//     width: "100%",
//     padding: "0px",
//     display: "flex",
//     justifyContent: "space-around",
//     alignItems: "center",
//     textAlign: "center",
//     lineHeight: "100%",
//   },
//   mainImg: {
//     height: "60%",
//     width: "100%",
//     border: "1px dashed grey",
//   },
//   mainP: {
//     width: "90%",
//     height: "8%",
//     lineHeight: "100%",
//     margin: "0",
//   },
//   mainButton: {
//     width: "100%",
//     height: "12%",
//     padding: "0px",
//   },
//   mainB: {
//     margin: "2px 2px",
//     width: "45%",
//   },
//   info: {
//     padding: "10px 10px",
//     margin: "10px 10px",
//   },
//   footer: {
//     display: "flex",
//     justifyContent: "flex-end",
//     padding: "20px",
//   },
// };

const ProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    products,
    productsTotal,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);
  const [page, setPage] = useState(1);
  const total = Math.ceil(productsTotal / 10);

  useEffect(() => {
    dispatch(getAllProducts({ page: page, limit: 10 }));
  }, [dispatch, page]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    console.log(products, productsTotal, productsError);
  }, [products, productsTotal, productsError]);

  const handlePages = (value) => {
    if (value >= 1 && value <= total) {
      setPage(value);
    }
  };

  return (
    <div>
      <header>
        <div>
          <h1>Products</h1>
        </div>
      </header>

      <main className="d-flex flex-row align-content-start flex-wrap m-3">
        {products?.map((item) => (
          <div className="p-2" key={item._id}>
            <div
              className="card text-center"
              style={{ width: "14rem", height: "20rem" }}
            >
              <div className="card-img-top" onMouseDown={() => navigate(`/products/${item._id}`)}>
                <img
                  src={"/" + item.imageUrl}
                  className="m-1"
                  style={{
                    maxWidth: "90%",
                    height: "10em",
                    objectFit: "contain",
                  }}
                />
              </div>

              <div className="card-body">
                <p
                  className="card-text"
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </p>
                <p className="card-title">${item.price}</p>
                <div>
                  {user?._id === item.userId ? (
                    <div>
                      <button type="button" className="btn btn-light m-3">
                        <Link
                          to={`/products/${item._id}/edit`}
                          style={{ textDecoration: "none" }}
                        >
                          edit
                        </Link>
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger m-3"
                        onMouseDown={() => {
                          dispatch(deleteProduct({ productId: item._id }));
                        }}
                      >
                        delete
                      </button>
                    </div>
                  ) : (
                    <AddCartComponent productId={item._id} />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      <footer
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
        }}
      >
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePages(page - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(total)].map((_, index) => (
              <li key={index} className="page-item">
                <button
                  className="page-link"
                  onClick={() => handlePages(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePages(page + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default ProductsPage;
