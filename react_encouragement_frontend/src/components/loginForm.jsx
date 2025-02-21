export default function LoginForm({formType, handleInputChange, formData, handleSubmit, responseMsg}){

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