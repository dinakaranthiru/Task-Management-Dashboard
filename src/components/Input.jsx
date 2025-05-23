const Input = ({ label, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col mb-4">
    {label && <label className="mb-1 font-semibold">{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

export default Input;
