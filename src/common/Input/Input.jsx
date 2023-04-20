const Input = ({ placeHold, i, typ, value, onChange }) => {
	return (
		<input
			placeholder={placeHold}
			id={i}
			type={typ}
			value={value}
			onChange={onChange}
			required
		/>
	);
};

export default Input;
