import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const ImageGallery = () => {
    return (
        <>
            <div className="slider-container">
                <AwesomeSlider animation="cubeAnimation">
                    <div data-src="/images/Drone1.jpg" />
                    <div data-src="/images/Drone2.jpg" />
                    <div data-src="/images/Drone3.jpg" />
                    <div data-src="/images/DroneRace.png" />
                    <div data-src="/images/DroneFootage.mp4" />
                </AwesomeSlider>
            </div>
        </>
    )
}

export default ImageGallery