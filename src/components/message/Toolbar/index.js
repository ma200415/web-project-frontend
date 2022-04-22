import './Toolbar.css';

export default function Toolbar(props) {
  const { title } = props;
  return (
    <div className="toolbar">
      <div className="left-items"></div>
      <h1 className="toolbar-title">{title}</h1>
      <div className="right-items"></div>
    </div>
  );
}