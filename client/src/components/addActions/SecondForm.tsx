import { useNavigate, useParams } from "react-router-dom";

const SecondForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    function saveAndNavigate(u: Partial<Event>) {
        // TODO: save actions in database, navigate to the event page
        navigate(`/event/${id}`);
    }

    return (
        <>
            <h1> Ajout des actions</h1>
            <form className="" data-dashlane-rid="ba67f2aec74f9c4b" data-form-type="register">
                <div className="form-floating mb-3">
                    <input type="email" className="form-control rounded-3" id="floatingInput" placeholder="name@example.com"
                           data-dashlane-rid="846c0b601eaec056" data-form-type="email" data-kwimpalastatus="alive"
                           data-kwimpalaid="1684961602484-0" />
                    <label htmlFor="floatingInput">Email address</label>

                </div>
                <div className="form-floating mb-3">
                    <input type="password" className="form-control rounded-3" id="floatingPassword" placeholder="Password"
                           data-dashlane-rid="4a2adc7086f093ee" data-form-type="password,new" data-kwimpalastatus="alive"
                           data-kwimpalaid="1684961602484-1"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 mb-2 btn btn-lg rounded-3 btn-primary"
                        type="submit"
                        data-dashlane-label="true"
                        data-dashlane-rid="03e77730d4441011"
                        data-form-type="action,next,register"
                        onClick={saveAndNavigate}>
                    Sign up
                </button>
            </form>
        </>
    )
}

export default SecondForm;