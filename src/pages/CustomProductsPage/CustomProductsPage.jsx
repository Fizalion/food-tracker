import { useDispatch, useSelector } from "react-redux";
import CustomProductForm from "../../components/CustomProductForm/CustomProductForm";
import CustomProductList from "../../components/CustomProductList/CustomProductList";
import { products } from "../../data/products";
import {
  addCustomProduct,
  removeCustomProductById,
  selectCustomProducts,
} from "../../redux/customProducts/customProductsSlice";
import { getAllProducts } from "../../utils/products";
import styles from "./CustomProductsPage.module.css";

const CustomProductsPage = () => {
  const dispatch = useDispatch();
  const customProducts = useSelector(selectCustomProducts);
  const allProducts = getAllProducts(products, customProducts);

  const handleAddCustomProduct = (product) =>
    dispatch(addCustomProduct(product));
  const handleRemoveCustomProductById = (id) =>
    dispatch(removeCustomProductById(id));

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Мои продукты</h1>

      <CustomProductForm
        products={allProducts}
        addCustomProduct={handleAddCustomProduct}
      />

      <span className={styles.count}>
        Добавлено продуктов: {customProducts.length}
      </span>

      <CustomProductList
        products={customProducts}
        removeCustomProductById={handleRemoveCustomProductById}
      />
    </div>
  );
};

export default CustomProductsPage;
