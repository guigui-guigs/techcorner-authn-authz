import ReactDOM from 'react-dom/client';
import App from './containers/App';

/*
const context = {
    test1: "test 1",
    test2: "test 2"
};
sessionStorage.setItem("context",JSON.stringify(context));
console.log(JSON.parse(sessionStorage.getItem("context")));
*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);