import "./App.css";
import ListStudentsComponent from "./components/ListStudentsComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
    return ( <
        div className = "App" >
        <
        HeaderComponent > < /HeaderComponent>{" "} <
        ListStudentsComponent > < /ListStudentsComponent>{" "} <
        FooterComponent > < /FooterComponent> <
        /div>
    );
}

export default App;