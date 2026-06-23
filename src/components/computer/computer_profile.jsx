import { useState,useEffect } from "react";
import styles from "./computer_profile.module.css"
import computer from '../../assets/c1.png'; 
const ComputerProfile = () => {
  useEffect(() => {
    // 1. Declare the async function inside the effect
    const init = async () => {
      try {
        console.log("Init...")
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    // 3. Call the function immediately
    init();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <div className="main">
        <div className={styles.computer_profiles}>
          <div class="card">
            <img src={computer} alt="Card Image" class="card-image"/>
            <div class="card-content">
              <h3 class="card-title">Card Title</h3>
              <p class="card-description">This is a short description text for the card component styled with CSS.</p>
              <a href="http://localhost:5173" className="button-link" target="_blank">Go to...</a>
            </div>
          </div>
          <div class="card">
            <img src={computer} alt="Card Image" class="card-image"/>
            <div class="card-content">
              <h3 class="card-title">Card Title</h3>
              <p class="card-description">This is a short description text for the card component styled with CSS.</p>
              <button class="card-button">Read More</button>
            </div>
          </div>
          <div class="card">
            <img src={computer} alt="Card Image" class="card-image"/>
            <div class="card-content">
              <h3 class="card-title">Card Title</h3>
              <p class="card-description">This is a short description text for the card component styled with CSS.</p>
              <button class="card-button">Read More</button>
            </div>
          </div>
          <div class="card">
            <img src={computer} alt="Card Image" class="card-image"/>
            <div class="card-content">
              <h3 class="card-title">Card Title</h3>
              <p class="card-description">This is a short description text for the card component styled with CSS.</p>
              <button class="card-button">Read More</button>
            </div>
          </div>
        </div>
    </div>  
  );
}
export default ComputerProfile;