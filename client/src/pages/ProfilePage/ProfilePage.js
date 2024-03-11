import Head from "../../components/Head/Head"
import Navbar from "../../components/Navbar/Navbar"
import StatsSection from './statsSection/StatsSection'
import ProfileSection from './profileSection/ProfileSection'

import styleCSS from './style.module.css'

function ProfilePage()
{

    return (
        <div className={styleCSS.main}>
            <Head pageTitle="Login"/>
            <Navbar />
            <div className={styleCSS.main_section}>
                <StatsSection />
                <ProfileSection />
            </div>

        </div>
    )
}

export default ProfilePage