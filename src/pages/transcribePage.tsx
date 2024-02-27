import TranscribeForm from "../components/transcribeForm";

const TranscribePage = () => {
    return (
        <div className="transcribe-page-wrapper">
            <div className="transcribe-page-content">
                <div className='transcribe-heading'>What are you listening for?</div>
                <TranscribeForm />
            </div>
        </div>
    )
}

export default TranscribePage;