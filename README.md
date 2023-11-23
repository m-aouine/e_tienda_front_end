# e_tienda_front_end
React Vite 

Esta es la carpeta que contiene Front End con React y Vite .

Comandos para ejecutar

npm install //para instalar los paquetes
npm run dev // para inciar el servidor


base_url :http://localhost:3007/

Unautheticated routes

"/register" // register for new user
"/login"  // log in for registerd users
"*"       // not found routes

Auutheticated routes with UseContext hook that hold state "isautheticated"

"/" // to show allthe products and make cotizacions 
"/cotizar"  // to show all cotizaciones

"/logout" // para salir

 
Componenets 
 <Navbar />  
 <Product/>
 <Login/> 
 <Register />
 <Cotizar /> 
 <ErrorPage />



Descripción general

Cuando un usuario está autenticado, el usuario será redirigido a la página de productos donde podrá seleccionar productos y realizar cotizaciones.
El usuario puede hacer clic en el botón Cotizar y creará una nueva entrada en la tabla de cotizaciones en el backend.
Las cotizaciones tienen un precio total, user_id,user_name,user_email y timestamps.
Debido al poco tiempo, envío información del usuario desde el front-end
en lugar de tomar información del usuario a través de claves externas en la tabla de usuarios.
Además por poco tiempo, las cotizaciones no tienen una tabla de detalles donde el usuario pueda ver todos los elementos dentro de las cotizaciones.

