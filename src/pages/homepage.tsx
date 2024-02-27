import './styles/homePageStyles.css';
import HOMEPAGE_INFO from '../data/homepage';

const HomePage = () => {
    return (
        <div className="home-page-wrapper">
            <div className='heading'>
                <div className='heading-line-1'>
                    <h1>{HOMEPAGE_INFO.main.headingLine1}</h1>
                </div>
                <div className='heading-line-2'>
                    <h1>{HOMEPAGE_INFO.main.headingLine2}</h1>
                </div>
            </div>
        </div>
    )
}

export default HomePage;