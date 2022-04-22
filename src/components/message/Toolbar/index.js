import './Toolbar.css';

export default function Toolbar(props) {
  const { title, upperTitle } = props;

  return (
    <div>
      <div className="toolbar-upperTitle">{upperTitle}</div>
      <div className="toolbar">
        <div className="left-items"></div>
        <div className="toolbar-title">{title}</div>
        <div className="right-items"></div>
      </div>
    </div>
  );
}