import { categoriesData } from "../data/CategoriesData";

/**
 * Transforme les catégories en une liste plate de produits enrichis.
 * Chaque produit reçoit des informations de catégorie pour être affiché plus facilement.
 */
function flattenProducts(category) {
  return category.products.map((product) => ({
    ...product,
    categoryId: category.id,
    categoryTitle: category.title,
    categoryIcon: category.icon,
  }));
}

export const allProducts = categoriesData.flatMap(flattenProducts);

export function getProductById(productId) {
  return allProducts.find((product) => product.id === productId);
}

export function getCategoryById(categoryId) {
  return categoriesData.find((category) => category.id === categoryId);
}

export function filterProducts({ categoryId, searchQuery }) {
  const normalizedQuery = (searchQuery || "").trim().toLowerCase();

  return allProducts.filter((product) => {
    const matchesCategory = !categoryId || product.categoryId === categoryId;
    if (!matchesCategory) return false;

    if (!normalizedQuery) return true;

    return [product.name, product.description, product.categoryTitle].some((value) =>
      value.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function sortProducts(products, sortBy) {
  if (!sortBy || sortBy === "default") {
    return products;
  }

  const result = [...products];

  if (sortBy === "price-asc") {
    result.sort((a, b) => a.newPrice - b.newPrice);
  } else if (sortBy === "price-desc") {
    result.sort((a, b) => b.newPrice - a.newPrice);
  } else if (sortBy === "name-asc") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "name-desc") {
    result.sort((a, b) => b.name.localeCompare(a.name));
  } else if (sortBy === "discount") {
    result.sort((a, b) => {
      const da = a.oldPrice ? (a.oldPrice - a.newPrice) / a.oldPrice : 0;
      const db = b.oldPrice ? (b.oldPrice - b.newPrice) / b.oldPrice : 0;
      return db - da;
    });
  }

  return result;
}

export function buildProductList({ categoryId, searchQuery, sortBy }) {
  const filtered = filterProducts({ categoryId, searchQuery });
  return sortProducts(filtered, sortBy);
}

