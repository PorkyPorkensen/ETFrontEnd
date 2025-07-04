export default function About(){
    return (
        <div className="mainDiv aboutDiv">
            <h1>About EasyTask</h1>
            <p className="aboutP">Firstly, thank you for checking out EasyTask. This was built by a jr developer as my first solo Node/Express Project.
                I wanted to build a simple task manager that could be used by anyone. I have 0 interest in collecting emails or bothering you with signing up for anything. That being said,
                this site has is one of my first feats in hosting my own databases, and tne security surrounding that. This is why you are given a password as opposed to using one of your own. Because of that, 
                <a className="red"> please refrain from posting ANY sensitive information.</a>  I hope you enjoy using it as much as I enjoyed building it.
            </p>
            <h1>How to Use</h1>
            <p className="aboutP">To get started, head to the <a href="/userinfo">User Info</a> page, enter a username and hit the "Generate User ID" button. Once you have a username, you can create tasks. 
                If you ever want to change your username, you can do so on the User Info page.</p>
            <p className="divFooter">For any questions or inquiries, please <a href="https://github.com/PorkyPorkensen">connect with me on Github!</a></p>
        </div>
    )
}