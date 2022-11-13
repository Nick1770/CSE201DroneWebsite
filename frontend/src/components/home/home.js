import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import './home.css'

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <div class="slider-container">
                <AwesomeSlider animation="cubeAnimation">
                    <div data-src="/images/leFish.png"/>
                    <div data-src="/images/Ligma.png" />
                </AwesomeSlider>
            </div>
            {/* <img src='/images/leFish.png' alt="image not found"/>
            <img src='/images/Ligma.png' alt="image not found"/> */}
        </>
    )
}

export default Home