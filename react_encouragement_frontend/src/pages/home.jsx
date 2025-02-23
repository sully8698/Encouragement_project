

export default function Home() {

    return(
        <>
            <div className="home-page-paragraph">
                <h2>Welcome to your encouragment site!</h2> 
                By signing up you have started a service of encouragment, 
                a way forward to positivity that everyone needs in life.
            </div>
            {/* need logic on this page to select a time, this will need to update the backend with PUT method
                backened still needs a spot to contain a time in the database per user account
                backened still needs a PUT method endpoint to change the time stored on user account */}
            
            {/* needs logic to update account information 
                send to PATCH method at accounts/update endpoint */}

            {/* Stretch goals:
                1) links to endpoints that are to mental health
                2) links to calming apps
            */}
        </>
    )
}