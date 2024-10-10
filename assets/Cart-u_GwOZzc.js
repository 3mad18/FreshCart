import{r,C as S,u as P,j as e,H as T,a as E}from"./index-Cxz_bOWM.js";function H(){var d,x;const{clearCart:m,setCartItemsNo:l,getLoggedUserCart:u,updateCartItemCount:h,deleteProductItem:p,cartItemsNo:f}=r.useContext(S),[t,a]=r.useState(null),[g,j]=r.useState(!0),[L,o]=r.useState(null),[y,N]=r.useState(null),c=P();async function w(){try{const s=await u();a(s),N(s.data.data._id)}catch(s){console.error("Error fetching cart info:",s)}finally{j(!1)}}async function b(s){const n=await p(s);a(n.data.data),l(n.data.numOfCartItems)}async function i(s,n){const I=await h(s,n);a(I.data.data)}async function C(){(await m()).data.message==="success"?(a(null),o("No Products To Show"),l(0)):console.log("Error clearing cart")}function v(){c(`/checkout/${y}`)}function k(){c("/products")}return r.useEffect(()=>{localStorage.getItem("userToken")?w():(a(null),o("No Products To Show"))},[]),g?e.jsx("div",{className:"py-8 w-full flex justify-center",children:e.jsx(T,{color:"green"})}):e.jsxs("div",{className:"frame pb-5",children:[e.jsxs("div",{className:"relative overflow-x-auto sm:rounded-lg",children:[e.jsxs("h2",{className:"text-2xl sm:text-4xl font-extrabold text-green-700 text-center mb-4",children:["Shopping Cart ",e.jsx("i",{className:"fa fa-shopping-bag"})]}),e.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-center text-lg font-semibold my-4 px-4",children:[e.jsxs("div",{className:"text-gray-600 text-xl mb-4 sm:mb-0",children:["Total Items in Cart: ",e.jsx("span",{className:"bg-white shadow-xl rounded-full border border-green-600 py-1 px-3 text-xl",children:f})]}),e.jsxs("div",{className:"text-slate-600",children:[e.jsx("span",{className:"text-gray-600 text-xl",children:"Total Cart Price:"})," ",e.jsxs("span",{className:"bg-white shadow-xl rounded-full border border-green-600 py-1 px-3 text-lg",children:[t==null?void 0:t.totalCartPrice," ",e.jsx("i",{className:"fa-solid fa-dollar-sign"})]})]})]}),((d=t==null?void 0:t.products)==null?void 0:d.length)>0?e.jsxs("table",{className:"w-full text-sm text-left rtl:text-right text-gray-500",children:[e.jsx("thead",{className:"text-xs text-gray-700 uppercase bg-gray-200",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"px-2 py-3",children:e.jsx("span",{className:"sr-only",children:"Image"})}),e.jsx("th",{scope:"col",className:"px-2 py-3",children:"Product"}),e.jsx("th",{scope:"col",className:"px-2 py-3",children:"Qty"}),e.jsx("th",{scope:"col",className:"px-2 py-3",children:"Price"}),e.jsx("th",{scope:"col",className:"px-2 py-3",children:"Action"})]})}),e.jsx("tbody",{children:t==null?void 0:t.products.map(s=>e.jsxs("tr",{className:"bg-white border-b hover:bg-gray-100",children:[e.jsx("td",{className:"p-2",children:e.jsx("img",{src:s.product.imageCover,className:"w-16 md:w-32 max-w-full max-h-full",alt:s.product.title})}),e.jsx("td",{className:"px-2 py-4 font-semibold text-gray-900",children:s.product.title}),e.jsx("td",{className:"px-2 py-4",children:e.jsxs("div",{className:"flex items-center justify-center",children:[e.jsxs("button",{onClick:()=>i(s.product.id,s.count-1),className:"inline-flex items-center justify-center p-1 me-2 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200",type:"button",children:[e.jsx("span",{className:"sr-only",children:"Decrease quantity"}),e.jsx("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 2",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M1 1h16"})})]}),e.jsx("div",{children:e.jsx("span",{children:s.count})}),e.jsxs("button",{onClick:()=>i(s.product.id,s.count+1),className:"inline-flex items-center justify-center h-6 w-6 p-1 ms-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200",type:"button",children:[e.jsx("span",{className:"sr-only",children:"Increase quantity"}),e.jsx("svg",{className:"w-3 h-3","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 18 18",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"M9 1v16M1 9h16"})})]})]})}),e.jsx("td",{className:"px-2 py-4 font-semibold text-gray-900",children:e.jsxs("span",{children:[s.price," EGP"]})}),e.jsx("td",{className:"px-2 py-4",children:e.jsx("span",{onClick:()=>b(s.product.id),className:"cursor-pointer font-medium text-red-600 hover:underline",children:"Remove"})})]},s.product.id))})]}):e.jsxs("div",{className:"flex flex-col justify-center items-center h-64",children:[e.jsx("span",{className:"text-gray-600 text-2xl font-semibold mb-4",children:"No Products To Show"}),e.jsxs("button",{onClick:k,className:"bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-800",children:["Start Shopping ",e.jsx("i",{className:"fa fa-shopping-cart"})]})]})]}),((x=t==null?void 0:t.products)==null?void 0:x.length)>0&&e.jsxs("div",{className:"flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 w-full py-8 mx-auto",children:[e.jsx("div",{className:"w-full md:w-1/4",children:e.jsx("button",{onClick:C,className:"text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full py-2.5 text-center",children:"Clear All"})}),e.jsx("div",{className:"w-full md:w-3/4",children:e.jsx("button",{className:"btnDetails w-full",onClick:v,children:"Continue To Check Out"})})]}),e.jsxs(E,{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("title",{children:"Cart"})]})]})}export{H as default};
