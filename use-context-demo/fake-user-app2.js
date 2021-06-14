import React, { useState, useContext, createContext } from "react"
import ReactDOM from "react-dom"

const LoginUserContext = createContext(null)


const UserButton = ()=>{
    const {LoginUser,setLoginUser}=useContext(LoginUserContext)
    const {fetching,setFetching}= useContext(true)
    const handleLogin=()=>{
        alert('handle Login')
        setFetching(true)
        fetch('https://randomuser.me/api/', { headers: { 'Content-Type': 'application/json' } })
            .then(res => res.json())
            .then(data => {
                const login = data.results[0].login

                setLoginUser({
                    picture: data.results[0].picture.large,
                    username: login.username,
                    email: data.results[0].email,
                    cell: data.results[0].cell,
                });
            })
    }

    if(fetching){
        return <div>...fetching</div>
    }

    return(
        <div>
            {
                LoginUser===null?<button onClick={handleLogin}>Login</button>:<button>Logout</button>
            }
        </div>
    )
}


function LoginButton(props) {

}

function UserInfo(props) {
    const { loginUser } = useContext(LoginUserContext)

    return (
        <div>
            <img src={loginUser.picture} style={{ borderRadius: '50%' }}/>
            <p>username: {loginUser.username}</p>
            <p>email: {loginUser.email}</p>
            <p>cell: {loginUser.cell}</p>
        </div>
    )
}

function LogoutButton(props) {
    const { setLoginUser } = useContext(LoginUserContext)

    const handleLogout = () => {
        setLoginUser(null)
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    )
}

function UserInfo(props) {
    const { loginUser } = useContext(LoginUserContext)

    return (
        <div>
            <img src={loginUser.picture} style={{ borderRadius: '50%' }}/>
            <p>username: {loginUser.username}</p>
            <p>email: {loginUser.email}</p>
            <p>cell: {loginUser.cell}</p>
        </div>
    )
}

function App() {
    const [ loginUser, setLoginUser ] = useState(null)

    return (
        <LoginUserContext.Provider value={ { loginUser, setLoginUser } }>
            {
                loginUser === null ?
                    <div>
                        <h2>"방문자"님 환영합니다.</h2>
                        <LoginButton />
                    </div>
                    :
                    <div>
                        <h2>"{loginUser.username}"님 환영합니다.</h2>
                        <UserInfo />
                        <LogoutButton />
                    </div>
            }
        </LoginUserContext.Provider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"));