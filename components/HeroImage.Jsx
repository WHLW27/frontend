import Image from 'next/image'
import logo from '../public/ningi_logo.webp'

function HeroImage() {
    return (
        <div>
            <Image src={logo} alt="Ningi's Company Logo" width={384} height={139} />
        </div>
    )
}
export default HeroImage
