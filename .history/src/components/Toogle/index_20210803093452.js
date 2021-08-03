// import './style.scss';

const Toggle = ({ onClick, value }) => {
  return (
    <label className="toggle">
      <input
        onChange={onClick}
        data-test="checkbox"
        type="checkbox"
        className="hidden"
        checked={value}
      />
      <div className="toggle-control" />
    </label>
  );
};

export default Toggle;
