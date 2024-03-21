import { Link } from "react-router-dom";

function ButtonRuta({ path, text, className }: { path: string; text: string; className: string; }) {
  return (
    <Link to={path} className={className}>{text}</Link>
  );
}

export default ButtonRuta;