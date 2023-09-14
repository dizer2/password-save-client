import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import Home from "./components/home/Home";
import { useState } from "react";


function App() {
	const [thisLogin, setThisLogin] = useState("");

	return (
    <BrowserRouter>
		<Routes>
			<Route path="/*" element={<Form setThisLogin={setThisLogin} /> } />
			<Route path="/home" element={<Home thisLogin={thisLogin} />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
