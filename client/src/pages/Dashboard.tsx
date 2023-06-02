import Footer from "../components/GlobalComponents/Footer/Footer";
import Header from "../components/GlobalComponents/Header/Header";
import User from "../components/UserComponents/User/User";

export default function FriendDashboard() {


  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="">
        <User />
        <div className="footer">
          <Footer />
        </div>
      </div>
    </>
  );
}
