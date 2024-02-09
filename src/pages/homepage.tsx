import UploadForm from "../components/uploadForm";

const Homepage = () => {
    return (
        <div>
            <header>
                <div className='logo-area'>
                    <a href='/'><img src='./logo-no-background.png' alt='decipher-logo'></img></a>
                </div>
            </header>
            <div className="home-content">
                <div className='subheading'>What are you listening for?</div>
                <UploadForm />
            </div>
        </div>
    )
}

export default Homepage;