import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './home.css'
import Newsletter from '../newsletter/Newsletter';

const Home = () => {
    return (
        <>
            <div class="wrapper">
                <h1>Welcome to MU Drone Club</h1>
                <div class="slider-container">
                    <AwesomeSlider animation="cubeAnimation">
                        <div data-src="/images/group.jpg" />
                        <div data-src="/images/coding.jpg" />
                        <div data-src="/images/presentation.jpg" />
                        <div data-src="/images/group1.jpg" />
                        <div data-src="/images/tShirt1.jpg" />
                        <div data-src="/images/tShirt2.jpg" />
                    </AwesomeSlider>
                </div>

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