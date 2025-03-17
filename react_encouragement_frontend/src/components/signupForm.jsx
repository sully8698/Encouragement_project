

export default function SignupForm({formType, handleInputChange, formData, handleSubmit, responseMsg}){
    
    return (
        <>
            {responseMsg && <h2>{responseMsg}</h2>}
            <div className="login">
                <h2>{formType}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            name="username"
                            id="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="first_name">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            id="first_name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last_name">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            id="last_name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone_number" aria-placeholder="+1xxxXXXxxxx">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            id="phone_number"
                            value={formData.phone_number}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                                <label htmlFor="message_hour">Message schedule: </label>
                                <select name="message_hour" id="message_hour" onChange={handleInputChange}>
                                    <option value="9">Select a time</option>
                                    <option value="0">12:00 AM</option>
                                    <option value="1">1:00 AM</option>
                                    <option value="2">2:00 AM</option>
                                    <option value="3">3:00 AM</option>
                                    <option value="4">4:00 AM</option>
                                    <option value="5">5:00 AM</option>
                                    <option value="6">6:00 AM</option>
                                    <option value="7">7:00 AM</option>
                                    <option value="8">8:00 AM</option>
                                    <option value="9">9:00 AM</option>
                                    <option value="10">10:00 AM</option>
                                    <option value="11">11:00 AM</option>
                                    <option value="12">12:00 PM</option>
                                    <option value="13">1:00 PM</option>
                                    <option value="14">2:00 PM</option>
                                    <option value="15">3:00 PM</option>
                                    <option value="16">4:00 PM</option>
                                    <option value="17">5:00 PM</option>
                                    <option value="18">6:00 PM</option>
                                    <option value="19">7:00 PM</option>
                                    <option value="20">8:00 PM</option>
                                    <option value="21">9:00 PM</option>
                                    <option value="22">10:00 PM</option>
                                    <option value="23">11:00 PM</option>
                                </select>
                            </div>
                    <div className="form-group">
                        <label htmlFor="timezone">timezone: </label>
                        <select name="timezone" id="timezone" onChange={handleInputChange}>
                            <option value="America/Los_Angeles">Pacific Standard Time (PST) - UTC -8:00</option>
                            <option value="America/Denver">Mountain Standard Time (MST) - UTC -7:00</option>
                            <option value="America/Chicago">Central Standard Time (CST) - UTC -6:00</option>
                            <option value="America/New_York">Eastern Standard Time (EST) - UTC -5:00</option>
                            <option value="America/Halifax">Atlantic Standard Time (AST) - UTC -4:00</option>
                            <option value="Pacific/Honolulu">Hawaii-Aleutian Standard Time (HST) - UTC -10:00</option>
                            <option value="America/Anchorage">Alaska Standard Time (AKST) - UTC -9:00</option>
                            <option value="America/Los_Angeles">Pacific Daylight Time (PDT) - UTC -7:00 (During Daylight Saving Time)</option>
                            <option value="America/Denver">Mountain Daylight Time (MDT) - UTC -6:00 (During Daylight Saving Time)</option>
                            <option value="America/Chicago">Central Daylight Time (CDT) - UTC -5:00 (During Daylight Saving Time)</option>
                            <option value="America/New_York">Eastern Daylight Time (EDT) - UTC -4:00 (During Daylight Saving Time)</option>
                            <option value="America/Halifax">Atlantic Daylight Time (ADT) - UTC -3:00 (During Daylight Saving Time)</option>
                            <option value="UTC">Coordinated Universal Time (UTC) - UTC 0:00</option>
                        </select>
                    </div>
                    <p>
                        By clicking "{formType}" you agree to the Terms and Conditions below. Also, to receive SMS messages. Message frequency may vary.
                        Standard message and data rates may apply. To opt out simply login, go to profile, and click the "Delete Profile" button.
                    </p>
                    <button type="submit">{formType}</button>
                    <div>  
                        <ol>
                            Terms and Conditions
                            <li>
                                Program Overview: The Daily SMS Encouragement Program sends daily text messages to participants to promote positivity and mental health 3. awareness. The content of these messages will focus on motivational messages, personal growth, self-care tips, and general encouragement.
                            </li>
                            <li>
                                Opt-In and Consent: By submitting your phone number through the website, you agree to receive daily SMS messages as part of this program. You acknowledge that message and data rates may apply depending on your mobile carrier.
                            </li>
                            <li>
                                Message Frequency: You will receive one SMS message per day at a time of your choosing during the sign-up process. The content of the messages will be positive and uplifting in nature.
                            </li>
                            <li>
                                Opt-Out: You may stop receiving messages at any time by logging in, going to profile, and clicking the "Delete Profile" button.
                            </li>
                            <li>
                                Privacy and Data Usage: Your phone number and email address will be used solely for the purpose of sending SMS messages as part of this program. We will not share your personal information with third parties without your explicit consent, except as required by law.
                            </li>
                            <li>
                                Eligibility: You must be 18 years or older to participate in this program. By signing up, you confirm that you meet this age requirement.
                            </li>
                            <li>
                                Modification and Termination of the Program: We reserve the right to modify, suspend, or terminate the Daily SMS Encouragement Program at any time without prior notice. In the event of program termination, participants will stop receiving SMS messages.
                            </li>
                            <li>
                                Limitation of Liability: We are not liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your participation in the Daily SMS Encouragement Program, including any issues with message delivery or network problems.
                            </li>
                            <li>
                                Governing Law: These terms and conditions are governed by the laws of United States, and any disputes arising from participation in the program will be resolved in accordance with those laws.
                            </li>
                        </ol>
                            By participating in the SMS Encouragement Program, you agree to these terms and conditions. If you do not agree, please do not sign up for the program.sign up for the program.
                    </div>
                </form>
            </div>
        </>
    );
}