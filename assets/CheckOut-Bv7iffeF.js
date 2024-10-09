import{f as g,r as o,C as p,u as f,y,z as n,A as b,j as e,a as v}from"./index-CSGg_514.js";function C(){let{cartId:s}=g(),{cashOnDelivery:i}=o.useContext(p),c=f();o.useEffect(()=>{console.log("Cart ID from URL:",s),s||console.error("Cart ID is missing from the URL")},[s]);async function d(){if(console.log("Form values:",r.values),console.log("Cart ID:",s),!s){console.error("Cart ID is missing");return}let t=`https://ecommerce.routemisr.com/api/v1/orders/${s}`;l&&(t=`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${s}?url=http://localhost:5174`);try{let a=await i(t,r.values);a.status==="success"?(console.log("Response:",a),l?window.location.href=a.session.url:c("/allorders")):console.error("Payment failed:",a)}catch(a){console.error("Error during payment:",a)}}const[l,u]=o.useState(!1),[j,m]=o.useState(0),h=["Cairo","Giza","Alexandria","Dakahlia","Red Sea","Beheira","Fayoum","Gharbia","Ismailia","Monufia","Minya","Qalyubia","New Valley","Suez","Aswan","Assiut","Beni Suef","Port Said","Damietta","Sharqia","South Sinai","Kafr El Sheikh","Matrouh","Luxor","Qena","North Sinai","Sohag"],x=y({phone:n().matches(/^01[0-2,5]\d{8}$/,"Invalid phone number. Please enter a valid 11-digit phone number starting with 01.").required("Phone number is required"),details:n().required("Details are required"),city:n().required("You must select a governorate")});let r=b({initialValues:{details:"",phone:"",city:""},validationSchema:x,onSubmit:d});return e.jsx(e.Fragment,{children:e.jsxs("div",{className:"frame py-10",children:[e.jsxs("form",{onSubmit:r.handleSubmit,className:"max-w-lg mx-auto bg-glass p-8 shadow-xl rounded-lg w-full flex flex-col items-center gap-6",children:[e.jsx("h1",{className:"text-4xl font-extrabold text-green-700 text-center",children:"Check Out"}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{htmlFor:"phone",className:"block mb-1 text-sm font-medium text-gray-600",children:"Your phone"}),e.jsx("input",{name:"phone",type:"tel",id:"phone",onBlur:r.handleBlur,onChange:r.handleChange,value:r.values.phone,className:`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 ${r.touched.phone&&r.errors.phone?"border-red-500":""}`,placeholder:"Type Your Phone",required:!0}),r.touched.phone&&r.errors.phone?e.jsxs("div",{className:"mb-2  text-sm text-red-800",children:[e.jsx("span",{className:"font-medium",children:"Error:"})," ",r.errors.phone]}):null]}),e.jsxs("div",{className:"w-full",children:[e.jsx("label",{htmlFor:"details",className:"block mb-1 text-sm font-medium text-gray-600",children:"Your details"}),e.jsx("input",{name:"details",type:"text",id:"details",onBlur:r.handleBlur,onChange:r.handleChange,value:r.values.details,className:`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 ${r.touched.details&&r.errors.details?"border-red-500":""}`,placeholder:"Type Any details you want",required:!0}),r.touched.details&&r.errors.details?e.jsxs("div",{className:"mb-2 text-sm text-red-800",children:[e.jsx("span",{className:"font-medium",children:"Error:"})," ",r.errors.details]}):null]}),e.jsxs("div",{className:"relative z-0 w-full mb-5 group",children:[e.jsxs("select",{value:r.values.city,name:"city",id:"city",onChange:t=>{m(t.target.value),r.setFieldValue("city",t.target.value)},className:`bg-gray-50 py-3 px-0 w-full text-md text-gray-700 bg-transparent border-b-2 border-gray-400 focus:outline-none focus:border-green-500 transition duration-200 ${r.touched.city&&r.errors.city?"border-red-500":""}`,children:[e.jsx("option",{value:"",disabled:!0,children:"Select Governorate"}),h.map((t,a)=>e.jsx("option",{value:t,children:t},a))]}),r.touched.city&&r.errors.city?e.jsxs("div",{className:"mb-2 text-sm text-red-800",children:[e.jsx("span",{className:"font-medium",children:"Error:"})," ",r.errors.city]}):null]}),e.jsxs("div",{className:"w-full",children:[e.jsx("input",{type:"checkbox",id:"forOnline",onChange:()=>u(!l),className:"mr-2"}),e.jsxs("label",{htmlFor:"forOnline",className:"text-sm font-medium text-gray-900",children:["Pay Online ",e.jsx("i",{className:"fa-regular fa-credit-card"})]})]}),e.jsx("button",{type:"submit",className:"w-full text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2 text-center",children:l?"Pay Online":"Cash On Delivery"})]}),e.jsxs(v,{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("title",{children:"Check Out"})]})]})})}export{C as default};
