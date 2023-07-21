import Header from "../components/GlobalComponents/Header/Header";
import CreateEvent from "../components/EventComponents/EventCreateForm/CreateEvent";
import Footer from "../components/GlobalComponents/Footer/Footer";

export default function EventCreate() {
    return (
        <div>
            <div className="header">
                <Header />
            </div>
            <div className="form__container">
                <CreateEvent />
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}
