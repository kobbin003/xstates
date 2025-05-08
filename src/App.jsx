import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import SelectComponent from "./component/SelectComponent";

function App() {
	const [countries, setCountries] = useState([]);
	const [states, setStates] = useState([]);
	const [cities, setCities] = useState([]);

	const [selectedCountry, setSelectedCountry] = useState("");
	const [selectedState, setSelectedState] = useState("");
	const [selectedCity, setSelectedCity] = useState("");

	// fetch the countries
	useEffect(() => {
		const countriesUrl =
			"https://crio-location-selector.onrender.com/countries";
		axios.get(countriesUrl).then(({ data }) => setCountries(data));
	}, []);

	// fetch the states
	useEffect(() => {
		if (selectedCountry) {
			// reset the selected state as well as the selected city on change of country
			setSelectedState("");
			setStates([]);
			setSelectedCity("");
			setCities([]);

			const statesUrl = `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`;
			axios.get(statesUrl).then(({ data }) => setStates(data));
		}
	}, [selectedCountry]);

	// fetch the cities
	useEffect(() => {
		if (selectedCountry && selectedState) {
			// reset the selected city on change of state
			setSelectedCity("");
			setCities([]);

			const cityUrl = `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`;
			axios.get(cityUrl).then(({ data }) => setCities(data));
		}
	}, [selectedCountry, selectedState]);

	return (
		<>
			<SelectComponent
				data={countries}
				placeholder="Select Country"
				selectedValue={selectedCountry}
				setSelectedValue={setSelectedCountry}
			/>
			<SelectComponent
				data={states}
				placeholder="Select State"
				selectedValue={selectedState}
				setSelectedValue={setSelectedState}
			/>
			<SelectComponent
				data={cities}
				placeholder="Select City"
				selectedValue={selectedCity}
				setSelectedValue={setSelectedCity}
			/>
			{selectedCountry && selectedState && selectedCity ? (
				<div>
					You selected {selectedCountry}, {selectedState}, {selectedCity}
				</div>
			) : (
				<></>
			)}
		</>
	);
}

export default App;
