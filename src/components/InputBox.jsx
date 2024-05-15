import '../styles/inputBox.css'

// eslint-disable-next-line react/prop-types
export default function InputBox({ value, onClick, selected }) {
    return (
      <input
        type="text"
        readOnly={true}
        className="inputBox"
        value={value}
        onClick={onClick}
        style={{ borderColor: selected ? 'black' : 'white' }}
      />
    );
  }