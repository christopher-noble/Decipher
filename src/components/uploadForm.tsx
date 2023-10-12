import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/uploadForm.css'
import '../css/keywordTags.css'
import { CSSProperties, useState } from 'react';
import KeywordTags from './keywordTags';
import { formatTimestamp, rawCharacters, youtubeParser } from '../utils/util';
import Spinner from 'react-bootstrap/Spinner';
const { v4: uuidv4 } = require('uuid');

const MISSING_SUBMISSION = 'Invalid input. Please include a submission';
let domain : string = 'https://d1jd4ljjsprf2p.cloudfront.net';

if (process.env.NODE_ENV === 'development') {
    domain = 'http://localhost:3000';
}
function UploadForm() {
    const [fullTranscript, setFullTranscript] = useState<string | string[]>('');
    const [fileBody, setFileBody] = useState<string | any>('');
    const [fileName, setFileName] = useState<any | null>('');
    const [isLoading, setIsLoading] = useState<any | null>(false);
    const [transcriptionComplete, setTranscriptionComplete] = useState<any | null>(false);
    const [transcriptTimestampMap, setTranscriptTimestampMap] = useState<any | null>([]);
    const [tags, setTags] = useState<any | null>('');
    const [inputUrlRef, setInputUrlRef] = useState<any | null>('');
    const [error, setError] = useState<string | null>(null);
    const [attemptedSubmission, setAttemptedSubmission] = useState<boolean | null>(null);

    const startTranscriptionJob = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('jobName', uuidv4());

        if (fileName && fileBody) {
            formData.append('file', fileBody);
        }
        else if (inputUrlRef) {
            formData.append('inputUrlRef', inputUrlRef);
        }
        else {
            setError(MISSING_SUBMISSION);
        }

        if ((inputUrlRef || fileName)) {
            axios.post(`${domain}/transcribe`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .then(response => {
                    if (!response) {
                        setError('Could not connect to the server. Please try again.')
                        throw new Error('Network response was not ok');
                    }
                    return response.data;
                })
                .then(data => {
                    setIsLoading(true);

                    if (data.fullTranscript) {
                        setTranscriptionComplete(true);
                        setFullTranscript(data.fullTranscript);
                        setIsLoading(false);
                    }
                    if (data.transcriptTimestampMap) {
                        setTranscriptTimestampMap(data.transcriptTimestampMap);
                    }
                })
                .catch(err => {
                    setIsLoading(false);
                    setError('Could not connect to the server. Please try again.')
                });
        }
        else {
            setIsLoading(false);
        }
    };

    const displayKeywordTimestampMatch = () => {
        let result: any[] = [];

        for (let tag of tags) {
            let words = tag.split(" ");
            let timestampsForTag = [];

            for (let i = 0; i < transcriptTimestampMap.length; i++) {
                let matches = true;

                for (let j = 0; j < words.length; j++) {
                    if (rawCharacters(transcriptTimestampMap[i + j].keyword) !== rawCharacters(words[j])) {
                        matches = false;
                        break;
                    }
                }

                if (matches) {
                    timestampsForTag.push(formatTimestamp(transcriptTimestampMap[i].timestamp));
                }
            }

            if (timestampsForTag.length) {
                result.push(`${tag}: ${timestampsForTag.join(', ')}`);
            }
        }

        return result.join('\n');
    }

    const setFileChange = async (event: any) => {
        setFileBody(event.target.files[0]);
        setFileName(event.target.files[0].name);
        setFileName((prevFileName: string) => {
            const newError = checkSubmissionError(prevFileName, inputUrlRef);
            setError(newError);
            return prevFileName;
        });
    }

    const setUrlChange = (event: any) => {
        event.preventDefault();
        setInputUrlRef(youtubeParser(event?.target.value))
        setInputUrlRef((prevInputUrlRef: string) => {
            const newError = checkSubmissionError(fileName, prevInputUrlRef);
            setError(newError);
            return prevInputUrlRef;
        });
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setAttemptedSubmission(true);
        if (!error) {
            startTranscriptionJob();
        }
    }


    const checkSubmissionError = (currentFileName: string, currentInputUrlRef: string) => {
        if (currentFileName && currentInputUrlRef) {
            return 'Please only include one submission';
        }
        else if (!currentFileName && !currentInputUrlRef) {
            return MISSING_SUBMISSION;
        }
        return null;
    };


    const errorStyle: CSSProperties = { color: 'red', paddingTop: '5px' };

    return (
        <>
            <KeywordTags
                tags={tags}
                setTags={setTags}
            />
            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-2 custom-file" onChange={setFileChange}>
                        <Form.Control className="custom-file-label" id="custom-file-input" type="file" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formText" className="mb-2 url-input">
                        <Form.Control className="url-input" onChange={setUrlChange} type="text" placeholder='Or insert YouTube link...' />
                    </Form.Group>
                </Col>
            </Row>
            {
                error && attemptedSubmission ?
                <Row>
                    <Form.Label style={errorStyle}>{error}</Form.Label>
                </Row>
                : ''
            }
            <Row>
                <Col>
                    <Form.Group controlId="formButton" className="mb-2">
                        <Button type="submit" className="btn btn-dark submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                {
                    isLoading ?
                        <Col className='spinner-col' xs={12}>
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </Col>
                        : ''
                }
                {
                    transcriptionComplete && !isLoading ?
                        <Row className='transcriptionRow'>
                            <Col>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" disabled={true} rows={10} onChange={(e) => setFullTranscript(e.target.value)} value={fullTranscript}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea2">
                                    <Form.Control as="textarea" disabled={true} rows={10} onChange={(e) => setTranscriptTimestampMap(e.target.value)} value={displayKeywordTimestampMatch()}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        : ''
                }
            </Row>
        </>
    );
}

export default UploadForm;