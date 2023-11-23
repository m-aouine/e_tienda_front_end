
import React, { useState, useEffect } from 'react';
import ApiAxios from '../../ApiAxios';
import axios from 'axios';

function Cotizar() {


  const [data, setData] = useState([]);



  const fetchData = () => {
    ApiAxios.get('show')
      .then(res => {
        console.log(res.data);
        setData(res.data.cotizaciones);
     
      })
      .catch(err => console.error(err));
  };


  useEffect(() => {
   
    fetchData();
  }, []);





  return (


    <div className="container">


   <hr/>
      <div className="row">



        <div className="col-md-12">  


          <h4 className='text-primary'>Cotizaciones</h4>
          <br/>


          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Precio</th>
                <th scope="col">Nombre del usuario</th>
                <th scope="col">Email del usuario</th>             
              </tr>
            </thead>
            <tbody>

            {data.map(product => (
           <tr key={product.id}>
           <th scope="row">{product.id}</th>
           <td>{product.total_price}</td>
           <td>{product.user_name}</td>
           <td>{product.user_email}</td>
           
     
    
    </tr>
  ))}

 </tbody>


          </table>        
        </div>



      
      </div>
    </div>



  );




  
}

export default Cotizar;
