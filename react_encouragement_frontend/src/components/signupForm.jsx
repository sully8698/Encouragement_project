

export default function SignupForm({formType, handleInputChange, formData, handleSubmit, responseMsg}){
    // need some code to handle all input fields if signup
    // or only password and username if login (meaning all account info in database)
    

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
                                    <option value="12">12:00 AM</option>
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
                                    <option value="0">12:00 PM</option>
                                </select>
                                {/* <input
                                    type="text"
                                    name="message_hour"
                                    id="message_hour"
                                    value={data.message_hour}
                                    onChange={handleInputChange}
                                /> */}
                            </div>
                    <div className="form-group">
                        <label htmlFor="timezone">timezone: </label>
                        <select name="timezone" id="timezone" onChange={handleInputChange}>
                            <option value="PST">Pacific Standard Time (PST) - UTC -8:00</option>
                            <option value="MST">Mountain Standard Time (MST) - UTC -7:00</option>
                            <option value="CST">Central Standard Time (CST) - UTC -6:00</option>
                            <option value="EST">Eastern Standard Time (EST) - UTC -5:00</option>
                            <option value="AST">Atlantic Standard Time (AST) - UTC -4:00</option>
                            <option value="HST">Hawaii-Aleutian Standard Time (HST) - UTC -10:00</option>
                            <option value="AKST">Alaska Standard Time (AKST) - UTC -9:00</option>
                            <option value="PDT">Pacific Daylight Time (PDT) - UTC -7:00 (During Daylight Saving Time)</option>
                            <option value="MDT">Mountain Daylight Time (MDT) - UTC -6:00 (During Daylight Saving Time)</option>
                            <option value="CDT">Central Daylight Time (CDT) - UTC -5:00 (During Daylight Saving Time)</option>
                            <option value="EDT">Eastern Daylight Time (EDT) - UTC -4:00 (During Daylight Saving Time)</option>
                            <option value="ADT">Atlantic Daylight Time (ADT) - UTC -3:00 (During Daylight Saving Time)</option>
                            <option value="UTC">Coordinated Universal Time (UTC) - UTC 0:00</option>
                        </select>
                    </div>
                    <p>
                        By clicking "{formType}" you agree to receive SMS messages. Message frequency may vary.
                        Standard message and data rates may apply. To opt out, input Username and Password and click the "Remove User" below.
                    </p>
                    <button type="submit">{formType}</button>
                </form>
            </div>
        </>
    );
}