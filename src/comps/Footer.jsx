import "./Footer.css";

const Footer = () => {
    return (
        <footer className="main-footer">
            <div className="content-wrapper">
                <div className="info-section">
                    <div className="brand-header">
                        <h3 className="main-title">Stuyvesant Senior Caucus</h3>
                        <p className="info-text location-text">345 Chambers St, Manhattan, NY 10282</p>
                    </div>
                    <div className="social-links">
                        <a href="https://linktr.ee/seniorcaucus2026" target="_blank" rel="noopener noreferrer" className="link-item">
                            <img 
                                src="/images/linktree-icon-transparent.png" 
                                alt="link-tree" 
                                className="icon-image"
                            />
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="link-item">
                            <img 
                                src="/images/instagram-logo-transparent.png" 
                                alt="insta" 
                                className="icon-image"
                            />
                        </a>
                        <a href="https://www.facebook.com/share/g/1D2kZEi262/" target="_blank" rel="noopener noreferrer" className="link-item">
                            <img 
                                src="/images/facebook-logo-transparent.png" 
                                alt="FB" 
                                className="icon-image"
                            />
                        </a>
                    </div>
                    <p className="info-text">© Stuyvesant High School 2025-26</p>
                </div>
                <div className="logo-section">
                    <a href="https://en.wikipedia.org/wiki/Stuyvesant_High_School" target="_blank" rel="noopener noreferrer" className="link-item">
                        <img 
                            src="/images/stuyvesant-high-school-logo-transparent.png" 
                            alt="stuyvesant-high-school" 
                            className="brand-logo"
                        />
                    </a>
                </div>
                <div className="credits-section">
                    <div className="credits-content">
                        <p className="footer-text credits-title"><strong>Credits:</strong></p>
                        <p className="info-text"><strong>Co-Presidents:</strong> Vanna Lei & Amy Zhou</p>
                        <p className="info-text"><strong>Development Leads:</strong> Rahul Deb & Jiewen Huang</p>
                        <p className="info-text"><strong>Junior Caucus IT Team:</strong></p>
                        <p className="footer-text team-list"> Ardian Agoes | David Lee | Kalimul Kaif | Kanchanok Zhang (Ting Ting)</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
