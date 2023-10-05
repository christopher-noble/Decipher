import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './css/uploadForm.css'
import './css/keywordTags.css'
import { useState } from 'react';
import ProgressBar from './progressBar';
import KeywordTags from './keywordTags';
import { formatTimestamp, rawCharacters, youtubeParser } from './util';
const { v4: uuidv4 } = require('uuid');

function UploadForm() {
    const [fullTranscript, setFullTranscript] = useState<any | null>('');
    const [s3FileBody, setS3FileBody] = useState<any | null>('');
    const [s3FileName, setS3FileName] = useState<any | null>('');
    const [jobName, setJobName] = useState<any | null>(s3FileName + uuidv4());
    const [isLoading, setIsLoading] = useState<any | null>(false);
    const [transcriptionComplete, setTranscriptionComplete] = useState<any | null>(false);
    const [transcriptTimestampMap, setTranscriptTimestampMap] = useState<any | null>([]);
    const [tags, setTags] = useState<any | null>('');
    const [inputUrlRef, setInputUrlRef] = useState<any | null>('');
    const [error, setError] = useState(null);

    const s3BucketName = 'decipher-audio-files';

    const startTranscriptionJob = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', s3FileBody);
        formData.append('jobName', jobName);
        formData.append('inputUrlRef', inputUrlRef);

        console.log("inputUrlRef: ", inputUrlRef);

        if (s3FileName.length > 1 && transcriptTimestampMap.length < 1 || inputUrlRef.length > 1) {
            axios.post('http://localhost:3001/transcribe', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                })
                .then(response => {
                    if (!response) {
                        throw new Error('Network response was not ok');
                    }
                    setIsLoading(true);
                    return response.data;
                })
                .then(data => {
                    if (data.fullTranscript) {
                        setTranscriptionComplete(true);
                        setFullTranscript(data.fullTranscript);
                        setIsLoading(false);
                    }
                    if (data.transcriptTimestampMap) {
                        setTranscriptTimestampMap(data.transcriptTimestampMap);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsLoading(false);
                });
        }
        else {
            setIsLoading(false);
            alert("Please upload a file");
        }
    };

    const displayKeywordTimestampMatch = () => {
        let result: any[] = [];

        tags.forEach((tag: string) => {
            transcriptTimestampMap.forEach((item: string | any) => {
                if (rawCharacters(tag) === rawCharacters(item.keyword) && item.timestamp) {
                    result.push(item.keyword + ' ... ' + formatTimestamp(item.timestamp) + 's')
                }
            })
        })

        return result.join('\n');
    }

    const setFile = async (event: any) => {
        setS3FileBody(event.target.files[0]);
        setS3FileName(event.target.files[0].name);
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        setJobName(s3FileName + uuidv4());
        setInputUrlRef(youtubeParser(event?.target.value))
        // if (inputUrlRef && inputUrlRef != '') {
        //     getTranscriptFromURL(event);
        // }
        startTranscriptionJob();
    }

    const handleURLInputChange = (event: any) => {
        event.preventDefault();
        console.log("event.target.value: ", youtubeParser(event?.target.value));
        setInputUrlRef(youtubeParser(event?.target.value))
    }

    const getTranscriptFromURL = async (event: any) => {
        try {
            axios.post('http://localhost:3001/processTranscriptFromURL')
                .then(response => {
                    if (!response) {
                        throw new Error('Network response was not ok');
                    }
                    setIsLoading(true);
                    return response.data;
                })
                .then(data => {
                    if (data.fullTranscript) {
                        setTranscriptionComplete(true);
                        setFullTranscript(data.fullTranscript);
                        setIsLoading(false);
                    }
                    if (data.transcriptTimestampMap) {
                        setTranscriptTimestampMap(data.transcriptTimestampMap);
                    }
                    setIsLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setIsLoading(false);
                });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Row>
                <KeywordTags
                    tags={tags}
                    setTags={setTags}
                />
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-2" onChange={setFile}>
                        <Form.Control type="file" />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Group controlId="formText" className="mb-2">
                        <Form.Control onChange={handleURLInputChange} type="text" placeholder='Or insert YouTube link...' />
                    </Form.Group>
                </Col>
            </Row>
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
                        <ProgressBar
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{ margin: 'auto', width: '500%' }}
                            wrapperClass="progress-bar-wrapper"
                            borderColor='#212529'
                            barColor='#424649'
                        />
                        : ''
                }
                {
                    transcriptionComplete && !isLoading ?
                        <Row className='transcriptionRow'>
                            <Col>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" rows={10} onChange={(e) => setFullTranscript(e.target.value)} value={fullTranscript}></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea2">
                                    <Form.Control as="textarea" rows={10} onChange={(e) => setTranscriptTimestampMap(e.target.value)} value={displayKeywordTimestampMatch()}></Form.Control>
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