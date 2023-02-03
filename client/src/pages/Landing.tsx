import { Link } from "react-router-dom";
import Logo from "../components/Logo/Logo";

export default function Landing() {
    return (
        <div className="landing">
          <Logo />
          <h4>Welcome sur les éco-co Challenges</h4>
          <Link to="/login">
            <button > Let's go Coco !</button>
           </Link>
        </div>
      
    )
}