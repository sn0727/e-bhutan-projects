export const RadioButton = (props) => {
  const { changed, id, isSelected, label, value } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' , gap:'15px'}}>
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
        style={{ accentColor: '#2C427D' }}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};