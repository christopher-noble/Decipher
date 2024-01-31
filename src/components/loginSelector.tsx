import { Button } from "react-bootstrap";
import '../css/loginSelector.css';

const LoginSelector = () => {
    return (
        <div className="login-buttons">
            <Button className="btn btn-dark submit">
                Log  In
            </Button>
            <Button className="btn btn-dark submit">
                Sign Up
            </Button>
        </div>
    )
}

export default LoginSelector;