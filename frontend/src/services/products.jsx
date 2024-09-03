import axios from "axios";
import config from "../config";

export async function getProducts() {
  const response = await axios.get(`${config.url}/admin/getAllProducts`);
  return response.data;
}

export async function getProductDetails(productId) {
  const response = await axios.get(
    `${config.url}/products/getProductById/${productId}`
  );
  return response.data;
}

// Function to handle file upload
export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(
    `${config.url}/product/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.fileName; // Adjust according to your backend response
};

// Function to create a product
export const createProduct = async (productData, sellerId, categoryId) => {
  try {
    const response = await axios.post(
      `${config.url}/product/${sellerId}/${categoryId}`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

// Function to add product to cart
export async function addProductToCart(userId, productId, quantity) {
  const response = await axios.post(`${config.url}/cart/add`, {
    userId,
    productId,
    quantity,
  });
  return response.data;
}

// Function to get cart products
export async function getCartProducts(userId) {
  const response = await axios.get(`${config.url}/cart/${userId}/products`);
  return response.data;
}

// Function to add product to wishlist
export const addProductToWishlist = async (customerId, productId) => {
  try {
    const response = await axios.post(`${config.url}/wishlist/add/${customerId}`,{productId});
    return response.data;
  } catch (error) {
    console.error('Error adding product to wishlist:', error);
    throw error;
  }
};

// Function to get wishlist products
export const getWishlistProducts = async (customerId) => {
  try {
    const response = await axios.get(`${config.url}/wishlist/getWishlist/${customerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wishlist products:', error);
    throw error;
  }
};


export const removeProductFromWishlist = async (customerId, productId) => {
  try {
    const response = await axios.delete(`${config.url}/wishlist/removeFromWishlist/${customerId}/${productId}`, {
      productId,
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to remove product from wishlist');
  }
};

// Function to get total product count for a seller
export async function getTotalProductCount(sellerId) {
  try {
    const response = await axios.get(`${config.url}/sellers/produtsCount/${sellerId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching total product count: " + error.message);
  }
}


export async function getOrderCounts(sellerId) {
  try {
    const response = await axios.get(`${config.url}/sellers/countOfStatus/${sellerId}`);
    const data = response.data;

    // Return counts, defaulting to 0 if null
    return {
      pendingCount: data.pendingCount || 0,
      shippedCount: data.shippedCount || 0,
      deliveredCount: data.deliveredCount || 0,
    };
  } catch (error) {
    throw new Error("Error fetching count of order by status : " + error.message);
  }
}

export const addProduct = async (productData, sellerId) => {
  try {
    const response = await axios.post(
      `${config.url}/products/add/${sellerId}`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error creating product: " + error.message);
  }
};

export async function getCategories() {
  try {
    const response = await axios.get(`${config.url}/category/getAllCategory`);
    return response.data; // This will be an array of category objects
  } catch (error) {
    throw new Error("Error fetching categories: " + error.message);
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await axios.delete(`${config.url}/products/delete/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error deleting product: " + error.message);
  }
}


export async function getProductsForSeller(sellerId) {
  try {
    const response = await axios.get(`${config.url}/sellers/getProductsBySellerId/${sellerId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}

export async function updateProduct(productId,updatedFields) {
  try {
    const response = await axios.patch(`${config.url}/sellers/update/${productId}`,updatedFields);
    return response.data;
  } catch (error) {
    throw new Error("Error updating products: " + error.message);
  }
}


export const getOrdersByStatus = async (sellerId, status) => {
  try {
    const response = await axios.get(`${config.url}/sellers/getOrdersByStatus/${sellerId}`, {
      params: { status },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching orders');
  }
};

export async function updateOrderStatus(orderId, status) {
  try {
    const response = await axios.patch(`${config.url}/sellers/updateOrderByStatus`, null, {
      params: {
        orderId,
        status,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating order: " + error.message);
  }
}


export async function getAllProducts() {
  try {
    const response = await axios.get(`${config.url}/admin/getAllProducts`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching products: " + error.message);
  }
}


// Function to get total product count 
export async function getAllProductCount() {
  try {
    const response = await axios.get(`${config.url}/admin/productsCount`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching total product count: " + error.message);
  }
}

// Function to get total order count y status
export async function getAllOrderCounts() {
  try {
    const response = await axios.get(`${config.url}/admin/count`);
    return response.data;
   
  } catch (error) {
    throw new Error("Error fetching total order count : " + error.message);
  }
}

export async function getTotalUsers() {
  try {
    const response = await axios.get(`${config.url}/admin/countOfUsers`);
    return response.data;
   
  } catch (error) {
    throw new Error("Error fetching total user count : " + error.message);
  }
}


export async function getTotalSellers() {
  try {
    const response = await axios.get(`${config.url}/admin/countOfSellers`);
    return response.data;
   
  } catch (error) {
    throw new Error("Error fetching total seller count : " + error.message);
  }
}


export const getAllOrdersByStatus = async (page, pageSize, status) => {
  try {
    const response = await axios.get(`${config.url}/admin/getOrdersByStatus`, {
      params: {
        page,
        pageSize,
        status,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error fetching orders: " + error.message);
  }
};



export async function getUsers() {
  try {
    const response = await axios.get(`${config.url}/admin/getUsers`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching users: " + error.message);
  }
}

export async function getSellers() {
  try {
    const response = await axios.get(`${config.url}/admin/getSellers`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching sellers: " + error.message);
  }
}

export async function updateShippedOrderStatus(orderId, status) {
  try {
    const response = await axios.patch(`${config.url}/admin/updateOrderByStatus`, null, {
      params: {
        orderId,
        status,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Error updating order: " + error.message);
  }
}