import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/uploadForm.css'
import '../css/keywordTags.css'
import { useState } from 'react';
import ProgressBar from './progressBar';
import KeywordTags from './keywordTags';
import { formatTimestamp, rawCharacters, youtubeParser } from '../utils/util';
const { v4: uuidv4 } = require('uuid');

function UploadForm() {
    const [fullTranscript, setFullTranscript] = useState<string | string[]>('');
    const [fileBody, setFileBody] = useState<string | any>('');
    const [fileName, setFileName] = useState<any | null>('');
    const [isLoading, setIsLoading] = useState<any | null>(false);
    const [transcriptionComplete, setTranscriptionComplete] = useState<any | null>(false);
    const [transcriptTimestampMap, setTranscriptTimestampMap] = useState<any | null>([]);
    const [tags, setTags] = useState<any | null>('');
    const [inputUrlRef, setInputUrlRef] = useState<any | null>('');

    const startTranscriptionJob = async () => {
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', fileBody);
        formData.append('jobName', uuidv4());
        formData.append('inputUrlRef', inputUrlRef);

        if (fileName.length > 1 || inputUrlRef.length > 1) {
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
                    alert("Internal Server Error: either could not connect or data is invalid");
                });
        }
        else {
            setIsLoading(false);
            alert("Please upload a file");
        }
    };

    const displayKeywordTimestampMatch = () => {
        let result: any[] = [];

        for (let tag of tags) {
            // Split the phrase into words
            let words = tag.split(" ");
            let timestampsForTag = [];

            for (let i = 0; i < transcriptTimestampMap.length; i++) {
                let matches = true;

                for (let j = 0; j < words.length; j++) {
                    // If there's a mismatch, break and set matches to false
                    if (rawCharacters(transcriptTimestampMap[i + j].keyword) !== rawCharacters(words[j])) {
                        matches = false;
                        break;
                    }
                }

                // If all words match, see if the tag is already in the result
                if (matches) {
                    timestampsForTag.push(formatTimestamp(transcriptTimestampMap[i].timestamp));
                }
            }

            // If there are timestamps for this tag, add them to the result
            if (timestampsForTag.length) {
                result.push(`${tag}: ${timestampsForTag.join(', ')}`);
            }
        }

        return result.join('\n');
    }

    const setFileChange = async (event: any) => {
        setFileBody(event.target.files[0]);
        setFileName(event.target.files[0].name);
    }

    const setUrlChange = (event: any) => {
        event.preventDefault();
        setInputUrlRef(youtubeParser(event?.target.value))
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();
        startTranscriptionJob();
    }

    return (
        <>
            <KeywordTags
                tags={tags}
                setTags={setTags}
            />
            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-2" onChange={setFileChange}>
                        <Form.Control className="file-selector"type="file" />
                    </Form.Group>
                </Col>
                <Col>
                    <Form.Group controlId="formText" className="mb-2 url-input">
                        <Form.Control className="url-input" onChange={setUrlChange} type="text" placeholder='Or insert YouTube link...' />
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