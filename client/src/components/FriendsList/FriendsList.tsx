import UserList from "../UserList/UserList";
import { useNavigate } from "react-router-dom";
import { useGetProfileQuery, User } from "../../gql/generated/schema";

const FriendsList = () => {
  const navigate = useNavigate();
  const { data: currentUser } = useGetProfileQuery({
    errorPolicy: "ignore",
  });

  function redirectToUserPage(u: Partial<User>) {
    navigate(`/friend/${u}`);
  }


  return (
      <div className="mt-5">
      {/* Heroe first part */}
      <div className="container col-xxl-8 px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://img.obox.group/u-j1Ak6qH-bdf8cAuch0kBtr8GM=/2280x1282/smart/filters:format(webp)/https%3A%2F%2Flecahier.com%2Fwp-content%2Fuploads%2F2019%2F11%2Fhelena-lopes-pgnqt0rxwls-unsplash.jpg"
              className="d-block mx-lg-auto img-fluid"
              alt="Bootstrap Themes"
              loading="lazy"
              width="700"
              height="500"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold lh-1 mb-3">Mes amis</h1>
            <p className="lead">
              Bienvenue sur la page des amis! Ici, vous pouvez voir la liste de
              vos amis connectés à l'application Eco-challenges. Vous pouvez
              inviter de nouveaux amis à rejoindre l'application et créer des
              groupes pour participer à des défis écologiques ensemble. Cliquez
              sur un ami pour voir son profil et découvrir les défis auxquels il
              a participé. Rejoignez-les et montrez votre engagement écologique
              en accomplissant des actions durables ensemble!
            </p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-custom-yellow btn-lg px-4 gap-3 text-center"
          onClick={(e) => navigate("/friends/add")}
        >
          Ajouter des amis
        </button>
      </div>
      <UserList
        users={currentUser?.profile.friends ?? []}
        onUserClick={redirectToUserPage}
        onUpdateUsersState={[]}
      />
    </div>
  );
};

export default FriendsList;
