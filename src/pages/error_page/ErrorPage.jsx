import React from 'react'
import './error_page.css'
import { Link,} from "react-router-dom";

function ErrorPage() {
  return (
   <div>

     <h1>Error : 404</h1>
    <h4>Page Not Found</h4>
    
    < Link to="/">Regresar</Link>

   </div>
  )
}

export default ErrorPage