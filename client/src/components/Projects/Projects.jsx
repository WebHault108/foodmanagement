import React from "react";
import "./Projects.css";

const Projects = () => {
  return (
    <>
      <div className="projects-container">
        <div className="section-title">
          <p>See Our Upcoming Events</p>
        </div>
        <div className="our-projects">
          <div className="project-title">
            <h1 className="project-heading">
              We are Creating sustainable society, for everyone and forever.
            </h1>
          </div>
          <div className="projects-grid">
            {/* project card  */}
            <div className="project-card card-bg ">
              <h3 className="card-title">Misson 40k - Tree Plantation</h3>
              <div className="card-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                temporibus enim animi!
              </div>
              <span className="card-btn">See more</span>
            </div>
            {/* project card  */}
            <div className="project-card card-bg bg-img1">
              <h3 className="card-title">Weekly Cleanliness Program in city</h3>
              <div className="card-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                temporibus enim animi!
              </div>
              <span className="card-btn">See more</span>
            </div>
            {/* project card  */}
            <div className="project-card card-bg bg-img2">
              <h3 className="card-title">Food Distribution 2024</h3>
              <div className="card-desc">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
                temporibus enim animi!
              </div>
              <span className="card-btn">See more</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
