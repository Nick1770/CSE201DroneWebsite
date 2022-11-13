import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <AwesomeSlider animation="cubeAnimation">
            <div data-src="/images/leFish.png"/>
            <div data-src="/images/Ligma.png" />
            </AwesomeSlider>
            {/* <img src='/images/leFish.png' alt="image not found"/>
            <img src='/images/Ligma.png' alt="image not found"/> */}
        </>
    )
}

export default Home