import { Button } from "react-bootstrap";
import '../../styles/headingButtonStyles.css';
import { Link } from "react-router-dom";

const HeadingButton = () => {
    return (
        <div className="heading-button-area">
            <Link to="/upload">
                <Button className="heading-button rounded-pill" variant="light">Try For Free</Button>{' '}
            </Link>
        </div>
    )
}

export default HeadingButton;