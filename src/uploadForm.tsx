import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './css/uploadForm.css'
import { useState } from 'react';
import { StartTranscriptionJobCommand, GetTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import ProgressBar from './progressBar';
import KeywordTags from './keywordTags';
const { v4: uuidv4 } = require('uuid');

const rawCharacters = (string: string) => {
    return string.replaceAll(/[^a-zA-z]/g, "").toLowerCase();
}

const formatTimestamp = (num: string) => {
    let result: string = '';
    if (num.indexOf('.') === 1) {
        result = num.replaceAll("[^0-9]", "").substring(0, 1);
    }
    else {
        result = num.replaceAll("[^0-9]", "").substring(0, 2);
    }
    return result;
}

const awsCreds = {
    region: 'us-west-2',
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
    }
}

function UploadForm() {
    const [fullTranscript, setFullTranscript] = useState<any | null>('');
    const [s3FileBody, setS3FileBody] = useState<any | null>('');
    const [s3FileName, setS3FileName] = useState<any | null>('');
    const [jobName] = useState<any | null>(s3FileName + uuidv4());
    const [isLoading, setIsLoading] = useState<any | null>(false);
    const [transcriptionComplete, setTranscriptionComplete] = useState<any | null>(false);
    const [transcriptTimestampMap, setTranscriptTimestampMap] = useState<any | null>([]);
    const [tags, setTags] = useState<any | null>('');

    const s3BucketName = 'decipher-audio-files';

    const transcribeClient = new TranscribeClient(awsCreds);
    const s3Client = new S3Client(awsCreds);

    const params = {
        TranscriptionJobName: jobName,
        LanguageCode: "en-US",
        MediaFormat: "mp3",
        Media: {
            MediaFileUri: `s3://decipher-audio-files/${s3FileName}`,
        },
        OutputBucketName: s3BucketName
    };

    const startTranscriptionJob = async (event: any) => {
        if (s3FileName !== '' && s3FileName !== null && transcriptTimestampMap.length < 1) {
            setIsLoading(true);
            const command = new PutObjectCommand({
                Bucket: s3BucketName,
                Key: s3FileName,
                Body: s3FileBody,
            });

            try {
                const response = await s3Client.send(command);
                console.log("S3 upload response: ", response);
            } catch (err) {
                console.error("error when uploading to S3 bitch: ", err);
            }

            setTimeout(async () => {
                console.log("delayed for 3 seconds")
                try {
                    const data = await transcribeClient.send(
                        new StartTranscriptionJobCommand(params)
                    );
                    console.log("StartTranscriptionJobCommand success - put", data);
                    getTranscriptionDetails();
                } catch (err) {
                    console.log("Error", err);
                }
            }, 3000);
        }
        else {
            setIsLoading(false);
            alert("Please upload a file");
        }
    };

    const fetchURLData = async () => {
        const command = new GetObjectCommand({
            Bucket: s3BucketName,
            Key: `${jobName}.json`
        });

        try {
            const response = await s3Client.send(command);
            const result = await response.Body?.transformToString();
            if (result) {
                const jsonOutput = await JSON.parse(result);
                let keywordTimestamp: any = [];
                setFullTranscript(jsonOutput.results.transcripts[0].transcript);
                jsonOutput.results.items.forEach((item: any) => {
                    keywordTimestamp.push({ 'keyword': item.alternatives[0].content, 'timestamp': item.start_time })
                })
                setTranscriptTimestampMap(keywordTimestamp);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const getTranscriptionDetails = async () => {
        try {
            const data = await transcribeClient.send(new GetTranscriptionJobCommand(params));
            const status = data.TranscriptionJob?.TranscriptionJobStatus;
            if (status === "COMPLETED") {
                setIsLoading(false);
                setTranscriptionComplete(true);
                fetchURLData();
            } else if (status === "FAILED") {
                setIsLoading(false);
                alert('Transcription Failed: ' + data.TranscriptionJob?.FailureReason);
            } else {
                console.log("In Progress...");
                setIsLoading(true);
                getTranscriptionDetails();
            }
        } catch (err) {
            console.log("Error", err);
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

    const setFile = (event: any) => {
        setS3FileBody(event.target.files[0]);
        setS3FileName(event.target.files[0].name);
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
                <Col xs='auto'>
                    <Button type="submit" className="btn btn-dark" onClick={startTranscriptionJob}>
                        Submit
                    </Button>
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
                    transcriptionComplete ?
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