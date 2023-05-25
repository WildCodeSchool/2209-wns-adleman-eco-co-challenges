import { useNavigate, useParams } from "react-router-dom";

const SecondForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    function saveAndNavigate() {
        // TODO: save actions in database, navigate to the event page
        console.log("coucou");
        // navigate(`/event/${id}`);
    }

    return (
        <>
            <h1> Ajout des actions</h1>
            <form
                className={"gap-5 d-flex flex-column justify-content-center"}
                onSubmit={(e) => {
                    e.preventDefault();
                    saveAndNavigate();
                }}
            >
                <div className={"border mx-5 px-5"}>
                    <h2> Première action</h2>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="firstFloatingTitle"
                            placeholder="name@example.com"
                            required={true}
                       />
                        <label htmlFor="firstFloatingTitle">
                            Nom de l'action
                        </label>

                    </div>
                    <div className="form-floating mb-3">
                        <input type="textaera"
                               className="form-control rounded-3"
                               id="firstfloatingDescription"
                               placeholder="Password"
                               required={true}
                       />
                        <label htmlFor="firstfloatingDescription">
                            Description de l'action
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control rounded-3"
                               id="firstFloatingPoints"
                               placeholder="xp"
                               required={true}
                        />
                        <label htmlFor="firstFloatingPoints">Points que rapporte l'action</label>
                    </div>
                </div>
                <div className={"border mx-5 px-5"}>
                    <h2> Deuxième action</h2>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="secondFloatingTitle"
                            placeholder="name@example.com"
                            required={true}
                        />
                        <label htmlFor="secondFloatingTitle">
                            Nom de l'action
                        </label>

                    </div>
                    <div className="form-floating mb-3">
                        <input type="textaera"
                               className="form-control rounded-3"
                               id="secondfloatingDescription"
                               placeholder="Password"
                               required={true}
                        />
                        <label htmlFor="secondfloatingDescription">
                            Description de l'action
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control rounded-3"
                               id="secondFloatingPoints"
                               placeholder="xp"
                               required={true}
                        />
                        <label htmlFor="secondFloatingPoints">Points que rapporte l'action</label>
                    </div>
                </div>
                <div className={"border mx-5 px-5"}>
                    <h2> Troisième action</h2>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control rounded-3"
                            id="thirdFloatingTitle"
                            placeholder="name@example.com"
                            required={true}
                        />
                        <label htmlFor="thirdFloatingTitle">
                            Nom de l'action
                        </label>

                    </div>
                    <div className="form-floating mb-3">
                        <input type="textaera"
                               className="form-control rounded-3"
                               id="thirdfloatingDescription"
                               placeholder="Password"
                               required={true}
                        />
                        <label htmlFor="thirdfloatingDescription">
                            Description de l'action
                        </label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text"
                               className="form-control rounded-3"
                               id="thirdFloatingPoints"
                               placeholder="xp"
                               required={true}
                        />
                        <label htmlFor="thirdFloatingPoints">Points que rapporte l'action</label>
                    </div>
                </div>

                <button className="text-center mx-5 mb-2 bg-primary btn btn-lg rounded-3 btn-primary"
                        type="submit"
                        data-dashlane-label="true"
                        data-dashlane-rid="03e77730d4441011"
                        data-form-type="action,next,register"
                        >
                    Ajouter les actions
                </button>
            </form>
        </>
    )
}

export default SecondForm;