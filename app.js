let users = []
let loginDashboard = {}
let newUserData={}

let page = window.location.href
page = page.split("/")
page = page[page.length - 1]
console.log(page)

const getNewData=()=>{
let data=localStorage.getItem("newLoginUsersData")
newUserData=JSON.parse(data)
console.log(newUserData)
}
getNewData()


const getUsers = () => {
    let takeUser = localStorage.getItem("usersData")
    users = JSON.parse(takeUser) || []
    console.log(users)
}

getUsers()



const getLoginData = () => {
    let takeLoginData = localStorage.getItem("LoginUsers")
    loginDashboard = JSON.parse(takeLoginData) || []
    console.log(loginDashboard)

}
getLoginData()

const editInfo = () => {

    let newFirstName = document.getElementById("newFirstName").value
    let newLastName = document.getElementById("newLastName").value
    let userImage = document.getElementById("myFile").value
    // console.log("customize", newFirstName)
    // console.log("customize", newLastName)
    // console.log("customize", userImage)

    let editData = {
        newFirstName: newFirstName,
        newLastName: newLastName,
        userImage: userImage

    }

    localStorage.setItem("newLoginUsersData", JSON.stringify(editData))
}

const Dashboard = () => {
    if (page == "dashboard.html") {
        
        let loginUserFirstName = loginDashboard.firstName
        let loginUserLastName = loginDashboard.lastName
        let loginUserDate = loginDashboard.date || "not entered yet"
        let loginUserEmail = loginDashboard.email

        document.querySelector("h1").innerHTML = `${loginUserFirstName + loginUserLastName}`

        // console.log(loginUserFirstName)
        // console.log(loginUserLastName)
        // console.log(loginUserDate)
        // console.log(loginUserEmail)
    }
}
Dashboard()




const customizeModal = () => {
    if (page == "dashboard.html") {
        var myBtn = document.getElementById("myBtn");

        myBtn.addEventListener('click', () => {
            let modal = document.getElementById("modal")
            modal.classList.toggle("modal_active")
            // console.log(modal)
            // alert(modal)
        })

        var cross = document.getElementById("cross")
        cross.addEventListener("click", () => {
            modal.classList.remove("modal_active")
        })
    }

}
customizeModal()


const signup = () => {
    let userFirstName = document.getElementById("firstName").value
    let userLastName = document.getElementById("lastName").value
    let Useremail = document.getElementById("userEmail").value
    let password = document.getElementById("userPassword").value
    let confirmPassword = document.getElementById("userConfirmPass").value
    let userDate = document.getElementById("userDate").value

    //    console.log(userFirstName)
    //    console.log(userLastName)
    //    console.log(Useremail)
    //    console.log(password)
    //    console.log(confirmPassword)
    //    console.log(userDate)

    if (password === confirmPassword) {
        let userData = {
            firstName: userFirstName,
            lastName: userLastName,
            email: Useremail,
            pass: password,
            Cpass: confirmPassword,
            date: userDate
        }
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === Useremail) {

                document.getElementById("emailAlertId").classList.add("active")

                setTimeout(() => {
                    document.getElementById("emailAlertId").classList.remove("active")
                }, 10000);

                return 0
            }
        }

        users.push(userData)
        localStorage.setItem('usersData', JSON.stringify(users))
        window.location.href = "./login.html"
    }
    else {

        document.getElementById("notMatch").classList.add("active")

        setTimeout(() => {

            document.getElementById("notMatch").classList.remove("active")
            console.log("set interval")
        }, 10000);

    }

}

const login = () => {
    let loginEmail = document.getElementById("loginEmail").value
    let loginPassword = document.getElementById("loginPassword").value
    let matched = false
    console.log(loginEmail)
    console.log(loginPassword)

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === loginEmail) {
            if (users[i].pass === loginPassword) {
                localStorage.setItem("LoginUsers", JSON.stringify(users[i]))
                window.location.href = "./dashboard.html"
                matched = true
            }
        }
    }
    if (!matched) {
        document.getElementById("invalidLogin").classList.add("active")

        setInterval(() => {
            document.getElementById("invalidLogin").classList.remove("active")
        }, 10000);
    }

}

const logout = () => {

    window.location.href = "./login.html"
    localStorage.removeItem("LoginUsers")
}
