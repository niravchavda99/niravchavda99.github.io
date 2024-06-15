import "./Footer.scss";
import tailwind from '../assets/icons/tech/tailwind.png';
import react from '../assets/icons/tech/react.svg';

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="footer">
            <div className="py-1 flex flex-row justify-center items-center">
                <div>Made with ❤️ by</div>
                <a href="https://niravchavda99.github.io" className="name">
                    Nirav Chavda
                </a>
                <div className="footer-text ml-2">© {year}</div>
            </div>
            <div className="py-1 flex flex-row justify-center items-center">
                <img src={react} alt="React" className='w-6 h-6 object-contain'/>
                <img src={tailwind} alt="React" className='w-6 h-6 object-contain ml-2'/>
            </div>
        </div>
    );
};

export default Footer;
