import {GetUsersDocument, useGetProfileQuery, useUpdateUserMutation} from "../../../gql/generated/schema";
import {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

const UserImageAdd = () => {
    // get the navigate function from react-router-dom
    const navigate = useNavigate();
    // UseState and UseEffect for the avatars
    const [avatars, setAvatars] = useState<{imageUrl: String, phrase: String}[]>([]);
    useEffect(() => {
        generateAvatars();
    }, []);
    const generateAvatars = () => {
        const newAvatars = Array.from({ length: 6 }, (_, index) => ({
            imageUrl: `https://api.dicebear.com/6.x/adventurer/svg?seed=${Math.floor(Math.random() * 1000)}`,
            phrase: choosePhrase[Math.floor(Math.random() * choosePhrase.length)],
        }));
        setAvatars(newAvatars);
    };
    const refreshAvatars = () => {
        generateAvatars();
    };
    // Get current user
    const { data: currentUser } = useGetProfileQuery({
        errorPolicy: "ignore",
    })
    // Get the user mutation to update the user
    const [updateUserMutation] = useUpdateUserMutation();
    // The phrases that will be displayed when the user will choose an avatar
    const choosePhrase = [
        "Ce sera toi !",
        "Je te choisis !",
        "Tu es parfait !",
        "Toi toi mon toi !",
        "let's go !",
        "Vamos !",
        "On dirait moi !",
        "Ou bien toi ?",
        "j'hésite...",
    ]
    // The function that will update the user with the choosen avatar
    const theChoosenOne = async (avatarUrl: string) => {
        const updatedData = {"image": avatarUrl}
        const userId = currentUser?.profile?.id;
        if (userId === undefined ) {
            return;
        }
        await updateUserMutation({
            variables: {
                userId: userId,
                data: updatedData
            },
            onCompleted: () => {
                toast.success("Ton profil a été mis à jour !");
                navigate(`/user/${userId}`);
            },
            onError: (err) => {
                console.error(err);
                toast.error("une erreur est survenue");
            },
            refetchQueries: [{ query: GetUsersDocument, variables: { userId } }],
        })
    };

    return (
        <>
            <div className="container my-5">
                <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border bg-white shadow-lg">
                    <div className="col-lg-10 p-3 p-lg-5 pt-lg-3">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">
                            Selectionnez votre avatar !
                        </h1>
                        <p className="lead">
                            Votre avatar sera visible par les autres utilisateurs, c'est ce qui correspondra à votre
                            image de profil ! <br/>
                            Vous pourrez à tout moment le modifier depuis votre profil.
                        </p>
                        <p className="lead">
                            Nous on les trouve tellement mignons qu'on n'arrive jamais à se décider !
                        </p>
                    </div>
                    <div className="d-flex justify-content-center mb-5">
                        <button type="button" className="btn bg-custom-yellow btn-primary col-6 btn-lg px-4" onClick={refreshAvatars}>
                            J'aimerais en voir d'autres !
                        </button>
                    </div>
                </div>
            </div>
            {/* make a 8 time loop  */}
            <div className="d-flex flex-wrap gap-5">
                {Array.from({ length: 6 }, (_, index) => (

                    <div className="container col-5 col-sm-3 col-lg-3" key={index}>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex flex-column align-items-center justify-content-center col-lg-4">
                                <img src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${Math.floor(Math.random() * 1000)}`} alt="" />
                                <button type="button"
                                        className="btn bg-custom-blue btn-primary btn-lg px-4"
                                        onClick={
                                            (event) => {
                                                event.preventDefault();
                                                // @ts-ignore
                                                theChoosenOne(event.target.previousElementSibling.getAttribute('src'));
                                            }
                                        }>
                                    {choosePhrase[Math.floor(Math.random() * choosePhrase.length)]}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserImageAdd;