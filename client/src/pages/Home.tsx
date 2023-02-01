import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
        
          <h4>Welcome sur les éco-co Challenges</h4>
          <Link to="/login">
            <button > Let's go Coco !</button>
           </Link>
        </>
      
    )
}