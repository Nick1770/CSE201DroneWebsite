import './home.css'
import Newsletter from '../newsletter/Newsletter';
import ImageGallery from '../imageGallery/ImageGallery';

const Home = () => {
    return (
        <>
            <div class="wrapper">
                <h1>Welcome to MU Drone Club</h1>
                <ImageGallery/>

                <h1>About Us!</h1>
                <d> The Miami University Drone Club is dedicated to flying drones,
                building drones, and spreading general knowledge about drones.
                We have in class drone races, attend seminars, have drone workshops
                every Wednesday and have plenty of oppurtunities to meet and connect
                with fellow enthusiasts. We will never charge club dues and are
                always open to new members! No knowledge necessary.</d>

                <Newsletter/>
            </div>
        </>
    )
}

export default Home