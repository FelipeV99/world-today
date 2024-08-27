/* eslint-disable react/prop-types */
export default function InputField({ error = false, name, type }) {
  return (
    <div className="input-group">
      <label htmlFor="password" className={`${error ? "error" : ""}`}>
        {name}
        <strong className="asterisk">*</strong>
      </label>

      <input
        className={`input-field ${error ? "error" : ""}`}
        name={name}
        type={type}
      />
    </div>
  );
}
