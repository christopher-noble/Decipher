/* Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
SPDX-License-Identifier: Apache-2.0

ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 3 (v3),
which is available at https://github.com/aws/aws-sdk-js-v3.

Purpose:
transcribe_create_job.ts demonstrates how to create an Amazon Transcribe transcription job.

Inputs (replace in code):
- REGION
- JOB_NAME
- LANGUAGE_CODE
- SOURCE_FILE_FORMAT
- SOURCE_LOCATION
- S3_BUCKET_DESTINATION

Running the code:
node transcribe_create_job.js
 */
// snippet-start:[transcribe.JavaScript.jobs.createJobV3]
// Import the required AWS SDK clients and commands for Node.js




import { StartTranscriptionJobCommand, TranscribeClient } from "@aws-sdk/client-transcribe";

const REGION = "us-west-2";
const JOB_NAME = 'JOB_1';
let SOURCE_LOCATION : any = '';
const transcribeClient = new TranscribeClient({ region: REGION });

export const params = {
  TranscriptionJobName: JOB_NAME,
  LanguageCode: "en-US", // For example, 'en-US'
  MediaFormat: "mp3", // For example, 'wav'
  Media: {
    MediaFileUri: SOURCE_LOCATION,
    // For example, "https://transcribe-demo.s3-REGION.amazonaws.com/hello_world.wav"
  },
};

export const run = async () => {
  try {
    const data = await transcribeClient.send(
      new StartTranscriptionJobCommand(params)
    );
    console.log("Success - put", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
