import './home.css'
import Newsletter from '../newsletter/Newsletter';
import ImageGallery from '../imageGallery/ImageGallery';
import QAndA from '../q&a/q&a';

const Home = () => {
    return (
        <>
            <h1>Welcome to Miami University Drone Club</h1>
            <ImageGallery/>

            <h1>About Us!</h1>
            <p> The Miami University Drone Club is dedicated to flying drones,
            building drones, and spreading general knowledge about drones.
            We have in class drone races, attend seminars, have drone workshops
            every Wednesday and have plenty of opportunities to meet and connect
            with fellow enthusiasts. <b>We will never charge club dues and are
            always open to new members!</b> No knowledge necessary.</p>

            <Newsletter/>
            <QAndA/>
        </>
    )
}

export default Home