import React from "react";

const SelectComponent = ({
	data,
	placeholder,
	selectedValue,
	setSelectedValue,
}) => {
	//* here we getting the selected value from the parent.
	// const [selectedValue, setSelectedValue] = useState(placeholder);
	const handleOnChange = (e) => {
		console.log("select-on-change", e.target.value);
		setSelectedValue(e.target.value);
	};
	return (
		<select value={selectedValue} onChange={handleOnChange}>
			<option value={""} defaultValue={true} disabled>
				{placeholder}
			</option>
			{data.length > 0 ? (
				data.map((val) => (
					<option value={val} key={val}>
						{val}
					</option>
				))
			) : (
				<></>
			)}
		</select>
	);
};

export default SelectComponent;
