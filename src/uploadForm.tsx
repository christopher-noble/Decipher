import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './css/uploadForm.css'

function UploadForm() {
    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-2">
                        <Form.Control type="file" />
                    </Form.Group>
                </Col>
                <Col xs='auto'>
                    <Button type="submit" className="mb-2">
                        Submit
                    </Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                        <Form.Control as="textarea" rows={10} />
                    </Form.Group>
                </Col>
            </Row>
        </>
    );
}

export default UploadForm;