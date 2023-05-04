const Input = ({ placeHold, id, type, value, onChange, required }) => {
	return (
		<input
			placeholder={placeHold}
			id={id}
			type={type}
			value={value}
			onChange={onChange}
			required={required}
		/>
	);
};

export default Input;
