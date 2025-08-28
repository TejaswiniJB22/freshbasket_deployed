# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



//-----------------------------------------------------------
Project Requirement Report | Brington 
Project Name: FreshBasket – Fruits eCommerce Website 
Platform: MERN Stack (MongoDB, Express.js, React.js, Node.js) 
Project Overview 
FreshBasket will be a simple online fruits store where users can view products, add them to a cart, 
and place an order. The website will be clean, responsive, and focus on ease of use. 
Pages 
1. Home Page 
o Header with logo, navigation, and cart icon 
o Banner image 
o List of fruits with name, price, and "Add to Cart" button 
2. Product Page 
o Product image, name, price, and description 
o Quantity selector 
o "Add to Cart" button 
3. Cart Page 
o List of selected products 
o Quantity update & remove option 
o Total price 
o "Checkout" button 
4. Checkout Page 
o Simple form: name, address, phone number 
o Place order button 
5. Order Confirmation 
o Message: “Order placed successfully” 
Technical Requirements 
• Frontend: React.js 
• Backend: Node.js + Express.js 
• Database: MongoDB 
• Styling: Basic CSS or Tailwind 
• API: 
o GET /products → fetch products 
o POST /cart → add to cart 
o POST /order → place order 
Features 
• Product listing 
• View product details 
• Add to cart 
• Update/remove cart items 
• Place order (saved in DB) 
Design Guidelines 
• Simple and clean 
• Light colors (green/white theme) 
• Large fruit images 
• Mobile-friendly layout 
Additional Notes 
• No payment integration for now (Cash on Delivery only) 
• No user login system in MVP 
• Admin will add products directly in the database 
• Host on Vercel