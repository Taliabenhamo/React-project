import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import Title from "../../components/Title";
import "../about/About.css"
import { useState } from "react";
import { toast } from "react-toastify";




function About() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [messange, setMessange] = useState("");

    function validate(): boolean {

        if (!name || name.length < 2) {
            toast.error("first name is required and at least then 2 characters.");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            toast.error("Email is required and must be valid.");
            return false;
        }

        if (!messange || messange.length < 10) {
            toast.error('Messange is required and must contain at least 10 characters');
            return false;
        }
        return true
    }
    const handleRefresh = () => {
        setName('');
        setEmail('');
        setMessange('');
    };

    function handleSubmit(event: React.FormEvent) {
        event.preventDefault();

        if (validate()) {
            toast.success("Your message has been sent!");
            handleRefresh()
        }
    }


    return (
        <>
            <Title mainText="Welcome to Bcard Vintage!" />

            <div className="wrap-about text-center m-5 p-2">
                <h2>About us:</h2>
                <p>
                    we believe that first impressions matter. Your business card is more
                    than just a piece of paper; it's a powerful tool that represents your
                    brand, communicates your essence, and leaves a lasting impact on
                    potential clients and partners. We are passionate about helping
                    professionals and businesses create stunning, unique, and memorable
                    business cards that stand out in a sea of competition.
                </p>
                <h3>
                    Our Mission:
                </h3>
                <p>
                    Our mission is simple: to empower individuals and businesses to make
                    an exceptional first impression through outstanding business card
                    designs. We understand that each person and business is unique, and we
                    strive to reflect that individuality in every card we create. We aim
                    to provide a seamless, enjoyable, and creative experience to all our
                    clients, ensuring they walk away with a business card that truly
                    captures their essence.
                </p>
                <h3>
                    Our Approach:
                </h3>
                <p>
                    We believe that creativity knows no bounds. Our team of skilled
                    designers and artists work tirelessly to push the boundaries of
                    traditional business card designs and explore innovative concepts. We
                    combine artistic flair with cutting-edge technology to bring your
                    vision to life on a tiny canvas. Whether you're looking for a
                    minimalistic design that exudes elegance or a bold and vibrant card
                    that demands attention, we've got you covered.
                </p>

                <h3>How It Works:</h3>
                <p>
                    Consultation: Share your ideas and requirements with us. Our team will
                    carefully listen to your vision and offer suggestions to enhance the
                    design. Design Process: Our skilled designers will work their magic to
                    create a captivating business card concept. We'll send you the design
                    for review and collaborate with you on any necessary revisions.
                    Printing and Delivery: Once you're delighted with the design, we'll
                    proceed with the printing process using top-notch materials. Your
                    bespoke business cards will be delivered to your doorstep promptly.
                    Join us at the Business Card Project, and let's create a business card
                    that leaves a lasting impression, opening doors to endless
                    opportunities for your professional journey. Contact us today to get
                    started on your unforgettable business card experience!
                </p>
            </div>
            <div className="img">
                <img src="https://cdn.pixabay.com/photo/2019/09/17/18/48/computer-4484282_1280.jpg" className="m-2" alt="coffe" />
                <img src="https://cdn.pixabay.com/photo/2018/03/10/12/00/teamwork-3213924_1280.jpg" className="m-2" alt="Teamwork" />
                <img src="https://cdn.pixabay.com/photo/2016/10/09/08/32/digital-marketing-1725340_1280.jpg" className="m-2" alt="graph" />
            </div>


            <div className="contact-container">
                <h2>Contact Us</h2>
                <p>Have questions or feedback? Reach out to us!</p>

                <form onSubmit={handleSubmit} >
                    <div className="form-floating m-2">
                        <input
                            id='floatingInput'
                            type="text"
                            className="form-control me-3"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor='floatingInput'>
                            Name: &#42;
                        </label>
                    </div>

                    <div className="form-floating m-2">
                        <input
                            id='floatingInput'
                            type="text"
                            className="form-control me-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor='floatingInput'>
                            Email: &#42;
                        </label>
                    </div>
                    <div className="mb-3">
                        <div className="form-floating m-2">
                            <input
                                id='floatingInput'
                                type="text"
                                className="form-control me-3"
                                value={messange}
                                onChange={(e) => setMessange(e.target.value)}
                            />
                            <label htmlFor='floatingInput'>
                                Messange: &#42;
                            </label>
                        </div>
                    </div>
                    <button type="submit" >Submit</button>
                </form>
                <p className="contact-info">
                    You can also contact us at <a href="mailto:buildingbusiness@example.com">buildingbusiness@example.com</a>.
                </p>



            </div>
            <div className="social-icons-container">
                <Twitter fontSize="large" />
                <Facebook fontSize="large" />
                <Instagram fontSize="large" />
                <LinkedIn fontSize="large" />
            </div>


        </>
    );
}


export default About;
