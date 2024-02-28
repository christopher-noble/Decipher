import TranscribeForm from "../components/transcribeForm";

const TranscribePage = () => {
    return (
        <div className="page-wrapper">
            <div className="page-content">
                <div className='page-heading'>What are you listening for?</div>
                <TranscribeForm />
            </div>
        </div>
    )
}

export default TranscribePage;