

export const getUserDetails=async()=>{
 try {
    const response = await fetch("http://localhost:8080/api/user/", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token":localStorage.getItem("token")
        }
    });
    const userDetails=await response.json();
    console.log(userDetails)
 } catch (error) {
   console.log("An unknown error occurred!");
 }
}