import classes from "../css/Form.module.css";

const FormItem = (props) => {
  const { input, id, label, err, type = "text" } = props;
  const { placeholder = label } = props;

  return (
    <div>
      <label htmlFor={id}>{label}:</label>
      <input
        className={input.hasError ? classes.invalid : classes.valid}
        placeholder={placeholder}
        id={id}
        onChange={input.valueChangeHandler}
        onBlur={input.inputBlurHandler}
        value={input.value}
        type={type}
      />

      {input.hasError && <p className={classes["error-text"]}>{err}</p>}
    </div>
  );
};

export default FormItem;
