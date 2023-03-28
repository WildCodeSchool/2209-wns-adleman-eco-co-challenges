import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import User from "../components/User/User";

export default function FriendDashboard() {


  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div>
        <User />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
