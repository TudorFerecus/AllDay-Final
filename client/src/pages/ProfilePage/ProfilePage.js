import Head from "../../components/Head/Head"
import Navbar from "../../components/Navbar/Navbar"
import StatsSection from './statsSection/StatsSection'
import ProfileSection from './profileSection/ProfileSection'
import useWindowSize from '../../hooks/useResizeWindow';

import styleCSS from './style.module.css'

function ProfilePage()
{
    const [windowSize, setWindowSize] = useWindowSize()
    return (
        <div className={styleCSS.main}>
            <Head pageTitle="Profile Page"/>
            <Navbar />
            {windowSize > 600? 
                <div className={styleCSS.main_section}>
                    <StatsSection />
                    <ProfileSection />
                </div> :
                <div className={styleCSS.main_section_phone}>
                    <StatsSection />
                    <ProfileSection />
                </div>
                
            }
            

        </div>
    )
}

export default ProfilePage