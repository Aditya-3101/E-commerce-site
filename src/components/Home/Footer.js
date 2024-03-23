import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";

export const Footer = () => {
    const [email,setEmail] = useState("")
    return<footer className="page-footer">
        <div className="page-footer-grid">
            <article className="footer-header">
                <h2>Electrify</h2>
                <p>Meet the only reliable source to buy goods!</p>
                <div>
                    <a href="https://github.com/Aditya-3101" target="_blank"><FaGithub className="social-icons"/></a>
                <a href="https://www.linkedin.com/in/aditya-dhayfule-38948220b/" target="_blank"><FaLinkedin className="social-icons" /></a>
                </div>
                
            </article>
            <div className="footer-inner-sections">
               <article>
                <h2>Support</h2>
                <p>Mobile</p>
                <p>Laptops</p>
                <p>Careers</p>
            </article>
            <article>
                <h2>Help</h2>
                <p>Register a Complaint</p>
                <p>Be a seller!</p>
                <p>Track Your Complaints</p>
            </article>  
            </div>
           
            <article className="footer-end">
                <h2>Subscription</h2>
                <p>Subscribe Your Email address for latest news & updates.</p>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email address"/>
                <button>Submit</button>
            </article>
        </div>
        <p className="footer-cpyright">Copyright@2024. All rights reserved.</p>
    </footer>
}