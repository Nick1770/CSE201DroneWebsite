import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';

const ImageGallery = () => {
    return (
        <>
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
        </>
    )
}

export default ImageGallery