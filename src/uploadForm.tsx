import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './css/uploadForm.css'
import { useState } from 'react';
import { StartTranscriptionJobCommand, GetTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";
import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { Dna, ProgressBar } from 'react-loader-spinner';
const { v4: uuidv4 } = require('uuid');

const loadingStyle: any = {
    color: 'green'
}

const awsCreds = {
    region: 'us-west-2',
    credentials: {
        accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
    }
}

function UploadForm() {
    const [data, setData] = useState<any | null>('');
    const [s3FileBody, setS3FileBody] = useState<any | null>('');
    const [s3FileName, setS3FileName] = useState<any | null>('');
    const [jobName, setJobName] = useState<any | null>(s3FileName + uuidv4());
    const [isLoading, setIsLoading] = useState<any | null>(false);
    const [transcriptionComplete, setTranscriptionComplete] = useState<any | null>(false);

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

    const uploadFileToS3 = async () => {
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
    }

    const startTranscriptionJob = async (event: any) => {
        uploadFileToS3();
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
                setData(jsonOutput.results.transcripts[0].transcript);
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
                console.log("Failed:", data.TranscriptionJob?.FailureReason);
            } else {
                console.log("In Progress...");
                setIsLoading(true);
                getTranscriptionDetails();
            }
        } catch (err) {
            console.log("Error", err);
        }
    };

    const handleChange = (event: any) => {
        setData(event.target.value);
    };

    const setFile = (event: any) => {
        setS3FileBody(event.target.files[0]);
        setS3FileName(event.target.files[0].name);
    }

    return (
        <>
            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-2" onChange={setFile}>
                        <Form.Control type="file" />
                    </Form.Group>
                </Col>
                <Col xs='auto'>
                    <Button type="submit" className="mb-2" onClick={startTranscriptionJob}>
                        Submit
                    </Button>
                </Col>
            </Row>
            <Row>
                {
                    isLoading ?
                        <ProgressBar
                            height="100"
                            width="300"
                            ariaLabel="progress-bar-loading"
                            wrapperStyle={{ width: '100%' }}
                            wrapperClass="progress-bar-wrapper"
                            borderColor='#2381de'
                            barColor='#036bfc'
                        />
                        : ''
                }
                {
                    transcriptionComplete ?
                        <Col>
                            <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                                <Form.Control as="textarea" rows={10} onChange={handleChange} value={data}></Form.Control>
                            </Form.Group>
                        </Col>
                        : ''
                }
            </Row>
        </>
    );
}

export default UploadForm;