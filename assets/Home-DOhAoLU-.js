import{r as a,C as L,W as P,j as e,H as h,a as f,L as F,_ as l,b as g}from"./index-2eXFWlad.js";import{u as _}from"./useQuery-BJoWIzpA.js";import{S as j}from"./index-a93mDuFp.js";function E(){const{addProductToCart:i,cartItemsNo:n,setCartItemsNo:o}=a.useContext(L),{addProductToWishList:m}=a.useContext(P),[r,u]=a.useState(null),[c,x]=a.useState({}),[p,w]=a.useState(null);a.useEffect(()=>{const s=JSON.parse(localStorage.getItem("wishList"))||{};x(s);const t=localStorage.getItem("userToken");t&&w(t)},[]),a.useEffect(()=>{localStorage.setItem("wishList",JSON.stringify(c))},[c]);async function N(s){if(!p){l.error("Please log in to add products to the cart.",{duration:2e3});return}u(s);try{let t=await i(s);t.data.status==="success"?(o(d=>d+1),l.success(t.data.message,{duration:2e3})):l.error(t.data.message,{duration:2e3})}catch{l.error("Failed to add product to cart.",{duration:2e3})}finally{u(null)}}function S(){return g.get("https://ecommerce.routemisr.com/api/v1/products?page=2")}let{data:v,isError:y,error:T,isLoading:b}=_({queryKey:["recentProducts"],queryFn:S,staleTime:8e4,select:s=>s.data.data});if(b)return e.jsx("div",{className:"py-8 w-full flex justify-center",children:e.jsx(h,{color:"green"})});if(y)return e.jsx("div",{className:"py-8 w-full flex justify-center",children:e.jsx("h3",{children:T.message})});async function C(s){try{let t=await m(s);if(t&&t.status==="success"){const d=!c[s];x(k=>({...k,[s]:d})),l.success(d?"Product added to wishlist":"Product removed from wishlist",{duration:2e3})}else l.error((t==null?void 0:t.message)||"Failed to update wishlist",{duration:2e3})}catch{l.error("Failed to update wishlist. Please try again later.",{duration:2e3})}}return e.jsxs(e.Fragment,{children:[e.jsxs(f,{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("title",{children:"Recent Products"})]}),e.jsxs("div",{className:"frame ",children:[e.jsx("h1",{className:"text-4xl font-extrabold text-green-700 text-center",children:"Recent Products"}),e.jsx("div",{className:"row flex flex-wrap",children:v.map(s=>e.jsx("div",{className:"w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-2 py-3",children:e.jsxs("div",{className:"product shadow rounded-lg",children:[e.jsx(F,{to:`/productdetails/${s._id}/${s.category.name}`,children:e.jsx("img",{className:"w-full",src:s.imageCover,alt:s.title})}),e.jsx("span",{className:"block font-semibold mt-2 text-green-600 ml-1",children:s.category.name}),e.jsx("h3",{className:"text-lg font-normal text-gray-800 mb-4",children:s.title.split(" ").slice(0,2).join(" ")}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsxs("span",{className:"price",children:[s.price," EGP"]}),e.jsx("span",{onClick:()=>C(s._id),className:`fa fa-heart fa-lg ml-12 ${c[s._id]?"text-red-600":"text-gray-300"} hover:text-red-600`}),e.jsxs("span",{className:"mr-2",children:[s.ratingsAverage," ",e.jsx("i",{className:"fas fa-star text-yellow-500"})]})]}),e.jsx("button",{onClick:()=>N(s._id),className:"btn ",children:r===s._id?e.jsx("i",{className:"fas fa-spinner fa-spin"}):"Add to cart"})]})},s._id))})]})]})}function W(){const[i,n]=a.useState([]);function o(){g.get("https://ecommerce.routemisr.com/api/v1/categories").then(({data:r})=>{n(r.data)}).catch(r=>{console.error(r)})}a.useEffect(()=>{o()},[]);var m={focusOnSelect:!0,dots:!0,infinite:!0,speed:1e3,slidesToShow:8,slidesToScroll:1,autoplay:!0,responsive:[{breakpoint:1024,settings:{slidesToShow:3,slidesToScroll:3,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:2,slidesToScroll:2,initialSlide:2}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]};return e.jsx("div",{className:"frame",children:e.jsxs("div",{className:"py-5 ",children:[e.jsx("h2",{className:"font-serif text-lg py-2 text-green-600",children:"Shop Popular Categories"}),e.jsx(j,{...m,children:i.map(r=>e.jsxs("div",{children:[e.jsx("img",{className:"category-image w-full",src:r.image,alt:r.name}),e.jsx("h3",{className:"font-light",children:r.name})]},r._id))})]})})}const H="/FreshCart/assets/slider-image-3-BtMvVf4V.jpeg",R="/FreshCart/assets/slider-2-Byt2-_T5.jpeg",I="/FreshCart/assets/grocery-banner-2-D89ZspOQ.jpeg",O="/FreshCart/assets/slider-image-1-Dh9d2U6G.jpeg",A="/FreshCart/assets/slider-image-2-Xt88XJy9.jpeg";function J(){var i={dots:!0,infinite:!0,speed:1e3,slidesToShow:1,slidesToScroll:1,autoplay:!0,arrows:!1,responsive:[{breakpoint:1024,settings:{slidesToShow:1,slidesToScroll:1,infinite:!0,dots:!0}},{breakpoint:600,settings:{slidesToShow:1,slidesToScroll:1,initialSlide:1}},{breakpoint:480,settings:{slidesToShow:1,slidesToScroll:1}}]};return e.jsx("div",{className:"frame",children:e.jsxs("div",{className:"flex flex-col lg:flex-row",children:[e.jsx("div",{className:"w-full lg:w-3/4 mb-4 lg:mb-0 lg:mr-4",children:e.jsxs(j,{...i,children:[e.jsx("img",{src:H,alt:"",className:"w-full h-[400px] object-cover"}),e.jsx("img",{src:R,alt:"",className:"w-full h-[400px] object-cover"}),e.jsx("img",{src:I,alt:"",className:"w-full h-[400px] object-cover"})]})}),e.jsxs("div",{className:"w-full lg:w-1/4 flex flex-col space-y-4",children:[e.jsx("img",{src:O,alt:"",className:"w-full h-[200px] object-cover"}),e.jsx("img",{src:A,alt:"",className:"w-full h-[200px] object-cover"})]})]})})}function D(){const[i,n]=a.useState(!0);return a.useEffect(()=>{const o=setTimeout(()=>{n(!1)},3e3);return()=>clearTimeout(o)},[]),e.jsxs(e.Fragment,{children:[e.jsxs(f,{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("title",{children:"Home"})]}),i?e.jsx("div",{className:"flex justify-center items-center h-screen",children:e.jsx(h,{color:"green"})}):e.jsxs(e.Fragment,{children:[e.jsx(J,{}),e.jsx(W,{}),e.jsx(E,{})]})]})}export{D as default};
