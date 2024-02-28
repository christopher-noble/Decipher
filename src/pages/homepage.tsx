import './styles/homePageStyles.css';
import HOMEPAGE_INFO from '../data/homepage';
import HeadingButton from '../components/common/buttons/headingButton';

const HomePage = () => {
    return (
        <div className="home-page-wrapper">
            <div className="home-page-content">
                <div className='heading'>
                    <div className='heading-line-1'>
                        <h1>{HOMEPAGE_INFO.main.headingLine1}</h1>
                    </div>
                    <div className='heading-line-2'>
                        <h1>{HOMEPAGE_INFO.main.headingLine2}</h1>
                    </div>
                </div>
                <div className='subheading'>
                    <h4>{HOMEPAGE_INFO.main.subheading}</h4>
                </div>
                <HeadingButton />
            </div>
        </div>
    )
}

export default HomePage;