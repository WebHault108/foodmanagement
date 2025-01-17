export const AdminFooter = () => {
  return (
    <>
      <div className="col-12 fixed-b">
        <div className="card rounded mt-5 mb-2 mx-0 px-0">
          <div className="card-body">
            <p className="font-weight-normal text-center pt-2 card-text text-dark">
              {" "}
              Developed by AnnapurnaTeam @{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
