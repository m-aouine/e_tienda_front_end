# e_tienda_front_end
React Vite 

Esta es la carpeta que contiene Front End con React y Vite .

Comandos para ejecutar

npm install //para instalar los paquetes
npm run dev // para inciar el servidor


base_url :http://localhost:3007/

Rutas no autenticadas

"/register" // register for new user
"/login"  // log in for registerd users
"*"       // not found routes

Rutas no autenticadas  con  UseContext hook that tiene  estato "isautheticated"

"/" // para mostrar todos los productos y hacer cotizaciones 

"/cotizar"  // para mostrar las cotizaciones

"/logout" // para salir

 
Componentes

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
Debido al  tiempo limitado, envía información del usuario y los productos  desde el front-end
en lugar de tomar información del usuario a través de claves externas de  las tablas  usuarios y productos  en la tabla cotizaciones .
Además por  tiempo limitado, las cotizaciones no tienen una tabla de detalles donde el usuario pueda ver todos los elementos dentro de las cotizaciones.




