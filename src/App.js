import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import Home from "./components/home/Home";


function App() {
  return (
    <BrowserRouter>
		<Routes>
			<Route path="/*" element={<Form /> } />
			<Route path="/home" element={<Home />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
