import { Button } from "react-bootstrap";
import '../css/loginSelector.css';

const LoginSelector = () => {
    return (
        <div className="login-buttons">
            <div className="login-button">
                <Button className="btn btn-dark submit">
                    Log  In
                </Button>
            </div>
            <div className="login-button">
                <Button className="btn btn-dark submit">
                    Sign Up
                </Button>
            </div>
        </div>
    )
}

export default LoginSelector;