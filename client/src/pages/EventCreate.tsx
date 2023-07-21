import Header from "../components/GlobalComponents/Header/Header";
import EventImageAdd from "../components/EventComponents/EventImageAdd/eventImageAdd";
import Footer from "../components/GlobalComponents/Footer/Footer";

export default function EventImageSelection() {
  return (
    <div>
      <div className="header">
        <Header />
      </div>
      <div className="form__container">
        <EventImageAdd/>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
