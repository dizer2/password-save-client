import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./components/Form/Form";
import Home from "./components/home/Home";
import { useState } from "react";


function App() {
	const [thisLogin, setThisLogin] = useState(() => {
		const thisUserLocalStorig = localStorage.getItem('LOGIN-USER');
		return thisUserLocalStorig ? JSON.parse(thisUserLocalStorig) : "";
	});

	const [thisPassword, setThisPassword] = useState(() => {
		const thisUserLocalStorig = localStorage.getItem('PASSWORD-USER');
		return thisUserLocalStorig ? JSON.parse(thisUserLocalStorig) : "";
	});

	const [data, setData] = useState([]);

	return (
    <BrowserRouter>
		<Routes>
			<Route path="/*" element={<Form setThisPassword={setThisPassword} setThisLogin={setThisLogin} /> } />
			<Route path="/home" element={<Home data={data} setData={setData} setThisLogin={setThisLogin} setThisPassword={setThisPassword} thisPassword={thisPassword} thisLogin={thisLogin} />} />
		</Routes>
	</BrowserRouter>
  );
}

export default App;
