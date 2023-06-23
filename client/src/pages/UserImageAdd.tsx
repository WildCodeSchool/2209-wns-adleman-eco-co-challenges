
import Footer from "../components/GlobalComponents/Footer/Footer";
import Header from "../components/GlobalComponents/Header/Header";
import UserImageAdd  from "../components/UserComponents/UserImageAdd/UserImageAdd";
export default function UserImageAddPage() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="form__container">
        <UserImageAdd />
      </div>
      <div className="footer"> 
        <Footer />
      </div>
    </div>
  );
}
