import React, { useState, useEffect } from 'react';
import ApiAxios from '../../ApiAxios';
import axios from 'axios';

function Product() {


  const [data, setData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [productCart, setProductCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);


  const fetchData = () => {
    ApiAxios.get('mostrar')
      .then(res => {
        console.log(res.data);
        setData(res.data.products);
        setUserData(res.data.user);
      })
      .catch(err => console.error(err));
  };


  useEffect(() => {
   
    fetchData();
  }, []);



  const addToCart = (productId) => {
    const selectedProduct = data.find(product => product.id === productId);
    const existingProduct = productCart.find(item => item.id === productId);
    console.log(productCart);
  
    let updatedCart;
  
    if (existingProduct) {
      updatedCart = productCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.product_price }
          : item
      );
    } else {
      updatedCart = [
        ...productCart,
        { ...selectedProduct, quantity: 1, total: selectedProduct.product_price }
      ];
    }
  
  
    const totalPrice = updatedCart.reduce((total, item) => total + item.total, 0);
    setProductCart(updatedCart);
    setTotalPrice(totalPrice);
  };
  
  const decreaseQuantity = (productId) => {
    const existingProduct = productCart.find(item => item.id === productId);

    if (existingProduct && existingProduct.quantity > 0) {
      const updatedCart = productCart.map(item =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setProductCart(updatedCart);
      setTotalPrice(prevTotal => prevTotal - parseFloat(existingProduct.product_price));
    }
  };

  const clearCart = () => {
    setProductCart([]);
    setTotalPrice(0);
  };

  const sendProductsToBackend = async () => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
  
      const orderData = {
        items: productCart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          totalPrice: item.total,
        })),
        user: userData, 
      };
  
      const response = await ApiAxios.post('cotizar', { order: orderData }, { headers });
      clearCart();
      alert("Tu cotización se ha guardado exitosamente.");
      console.log(response.data);
    } catch (error) {
      console.error('Error sending order to backend:', error);
    }
  };
  
  const formattedTotalPrice = isNaN(parseFloat(totalPrice)) ? 'N/A' : parseFloat(totalPrice).toFixed(2);
  return (

  




    <div className="container">




        
<div>
  {productCart.length > 0 && (
    <>
      <button
        onClick={sendProductsToBackend}
        className="btn btn-success m-5"
      >
        Cotizar
      </button>

      <button
        onClick={clearCart}
        className="btn btn-warning"
      >
        Borrar
      </button>
    </>
  )}
</div>







   <hr/>
      <div className="row">



        <div className="col-md-6">        
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Imagen</th>
                <th scope="col">Codigo</th>
                <th scope="col">Nombre</th>
                <th scope="col">Precio</th>
                <th scope="col">Cantidad</th>
              </tr>
            </thead>
            <tbody>
      {data.map(product => (
    <tr key={product.id}>
      <th scope="row">{product.id}</th>
      <td style={{ verticalAlign: 'middle' }}>
      {product.product_image&&(
       <img src={product.product_image?product.product_image:""}
        alt={`Product ${product.id}`} style={{ maxWidth: '40px', height: 'auto', verticalAlign: 'middle' }} />
      )} 
        
      </td>
      
      <td>{product.product_code}</td>
      <td>{product.product_name}</td>
      <td>{product.product_price}</td>
      <td>
        <button className="btn btn-primary m-2" onClick={() => addToCart(product.id)}>+</button>
        <button
          className="btn btn-primary"
          onClick={() => decreaseQuantity(product.id)}
          disabled={productCart.find(item => item.id === product.id)?.quantity === 0}
        >
          -
        </button>{' '}
        <br/>
          {productCart.find(item => item.id === product.id)?.quantity || 0}
       
      </td>
    </tr>
  ))}
</tbody>


          </table>


         
        </div>

        <div className="col-md-6 bg-secondary">
          <div className="cart">

          <h5>Cotizacion</h5>
          <br/>
           
          <h4>Precio Total: {formattedTotalPrice}$</h4>


            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Producto</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {productCart.map((item, index) => (
                  <tr key={index}>
                    <td>{item.product_name}</td>
                    <td>{item.product_price}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            
          </div>
        </div>
      </div>
    </div>



  );




  
}

export default Product;
