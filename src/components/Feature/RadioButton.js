export const RadioButton = (props) => {
  const { changed, id, isSelected, label, value, className } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' , gap:'15px'}}>
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
        style={{ accentColor: '#2C427D' }}
        className={className}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export const RadioButton2 = (props) => {
  const { changed, id, isSelected, label, value, className } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' , gap:'15px'}}>
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
        style={{ accentColor: '#2C427D' }}
        className={className}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export const RadioButton3 = (props) => {
  const { changed, id, isSelected, label, value, className } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' , gap:'15px'}}>
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
        style={{ accentColor: '#2C427D' }}
        className={className}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export const RadioButton4 = (props) => {
  const { changed, id, isSelected, label, value, className } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' , gap:'15px'}}>
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
        style={{ accentColor: '#2C427D' }}
        className={className}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export const RadioButton5 = (props) => {
  const { changed, id, isSelected, label, value, className } = props;
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '100%' , gap:'15px'}}>
      <input
        id={id}
        onChange={changed}
        value={value}
        type="radio"
        checked={isSelected}
        style={{ accentColor: '#2C427D' }}
        className={className}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};