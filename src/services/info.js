export const generateProductErrorInfo = (product) => {
	return `One or more properties were incomplete or not valid.
      List of required properties:
      * name: needs to be a string, received ${product.name}
      * description: needs to be a string, received ${product.description}
      * price: needs to be a number, received ${product.price}
      * category: needs to be a string, received ${product.category}
      * availability: needs to be a number, received ${product.availability}`;
};

export const updateCartErrorInfo = (cart) => {
	return `One or more properties were incomplete or not valid.
      List of required properties:
      * products: needs to be an array of objects, received ${typeof cart.products}
      * Each product should have the following properties:
        - product: should be a valid product reference
        - quantity: needs to be a number greater than 0`;
};
