import UploadForm from "../components/uploadForm";

const UploadPage = () => {
    return (
        <div className="page-wrapper">
            <div className="page-content">
                {/* <div className='page-heading'>What are you listening for?</div> */}
                <UploadForm />
            </div>
        </div>
    )
}

export default UploadPage;